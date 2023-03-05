/** userController.js */

const db = require("../modules/db.js");
require("dotenv").config();

const argon2 = require("argon2");

const bcrypt = require("bcrypt");
const flash = require("express-flash");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const SALTROUNDS = 10;

// Home
exports.homeGET = (req, res) => {
  console.log("GET //");
  const roleData = req.cookies["_ro2e12s3"];
  let roleCustomer = false;
  let roleAdmin = false;

  console.log("adasdasdasdas");
  if (roleData === "customer") {
    roleCustomer = true;
  } else if (roleData === "admin") {
    roleAdmin = true;
  }
  res.render("home", {
    authorised: req.cookies["_aut121421"],
    roleCustomer: roleCustomer,
    roleAdmin: roleAdmin,
  });
};

// Login Users
exports.loginGET = (req, res) => {
  console.log("GET /login");
  res.render("login", {
    emailError: req.flash("emailError"),
    emailError: req.flash("systemError"),
    passError: req.flash("passError"),
  });
};

exports.loginPOST = async (req, res) => {
  console.log("POST /login");
  const start = new Date();
  const { inputLogEmail, inputLogPassword } = req.body;

  const conn = await db.getConnection();
  try {
    const [rows] = await db.execute(
      "SELECT * FROM accounts WHERE user_email = ?",
      [inputLogEmail]
    );
    const data = rows[0];

    if (!rows || !data) {
      req.flash("emailError", "Email not found");
      req.session.save(() => {
        res.redirect("/login");
      });
    }
    if (await argon2.verify(data.pass, inputLogPassword)) {
      req.flash("success", `Successfully Logged in as ${data.user_email}`);
      res.cookie("_aut121421", `${data.user_email}`);
      res.cookie("_ro2e12s3", `${data.role}`);
      res.cookie("_firN21kll21", `${data.user_first_name}`);
      res.cookie("_sltN21kll21", `${data.user_last_name}`);
      const end = new Date();
      const duration = end - start;
      console.log(`It took ${duration} milliseconds to complete.`);
      return req.session.save(() => {
        res.redirect("/customer-home");
      });
    } else {
      req.flash("passError", "Incorrect password");
      return req.session.save(() => {
        res.redirect("/login");
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    conn.release();
  }
};

// Register
exports.registerGET = (req, res) => {
  console.log("GET /register");
  res.render("register", {
    error: req.flash("error"),
  });
};
exports.registerPOST = async (req, res) => {
  console.log("POST /register");
  const data = req.body;

  const conn = await db.getConnection();
  try {
    // Check if user email already exists
    const [rows] = await db.query(
      "SELECT * FROM accounts WHERE user_email = ?",
      [data.email]
    );

    if (rows && rows.length > 0) {
      req.flash("error", `Email already in use!`);
      req.session.save(() => {
        res.redirect("/register");
      });
    } else {
      // If email does not exist, hash password and insert user information into database
      // const salt = bcrypt.genSaltSync(SALTROUNDS);
      // const hashedPassword = bcrypt.hashSync(data.inputPassword, salt);
      const hashedPassword = await argon2.hash(data.inputPassword);
      console.log("The hashed pass", hashedPassword);

      const [result] = await db.query(
        "INSERT INTO accounts (user_email, user_first_name, user_last_name, user_country, user_city, user_telephone, pass, subscribed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          data.email,
          data.inputFirstName,
          data.inputLastName,
          data.inputCountry,
          data.city,
          data.inputPhone,
          hashedPassword,
          data.subscribed,
        ]
      );
      req.flash("registered", `You are registered`);
      res.cookie("_aut121421", `${data.email}`);
      res.cookie("_ro2e12s3", `customer`);
      res.cookie("_firN21kll21", `${data.inputFirstName}`);
      res.cookie("_sltN21kll21", `${data.inputLastName}`);
      req.session.save(() => {
        res.redirect("/customer-home");
      });
    }
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  } finally {
    conn.release();
  }
};

// Customer-Home
exports.customerHomeGET = async (req, res) => {
  console.log("GET /customer-home");
  const authorised = req.cookies["_aut121421"];
  const userFirstName = req.cookies["_firN21kll21"];
  const roleData = req.cookies["_ro2e12s3"];
  let roleCustomer = true;
  const activeHome = true;

  if (!authorised) {
    res.redirect("/login");
  } else {
    const conn = await db.getConnection();
    try {
      const [rows] = await db.execute(
        "SELECT * FROM orders WHERE user_email = ? LIMIT 3",
        [authorised]
      );

      res.render("customer-home", {
        rows,
        authorised,
        userFirstName,
        roleCustomer,
        success: req.flash("success"),
        registered: req.flash("registered"),
        activeHome,
      });
    } catch (err) {
      console.log(err);
      res.redirect("/customer-home");
    } finally {
      conn.release();
    }
  }
};

exports.logout = (req, res) => {
  console.log("GET /logout");
  res.clearCookie("_aut121421");
  res.clearCookie("_ro2e12s3");
  res.clearCookie("_firN21kll21");
  res.clearCookie("_sltN21kll21");
  res.redirect("/");
};

exports.about = (req, res) => {
  console.log("GET /about");
  const authorised = req.cookies["_aut121421"];
  const active = true;
  let roleCustomer = true;
  res.render("about", { authorised, active, roleCustomer });
};

exports.pricingGET = (req, res) => {
  console.log("GET /pricing");
  const authorised = req.cookies["_aut121421"];
  const roleData = req.cookies["_ro2e12s3"];

  const activePricing = true;
  let roleCustomer = false;
  let roleAdmin = false;

  console.log("adasdasdasdas");
  if (roleData !== "admin") {
    roleCustomer = true;
  } else {
    roleAdmin = true;
  }

  res.render("pricing", {
    authorised,
    activePricing,
    roleCustomer: roleCustomer,
    roleAdmin: roleAdmin,
  });
};

// const storeItems = new Map([
//   // [1, {currency: 'cad'},]

//   // typeService: 'Academic Paper Writing ',
//   // typePaper: 'essay',
//   // numOfPages: '1',
//   // academicLevel: 'high-school',
//   // urgency: '40',
//   // paperFormat: 'OSCOLA',
//   // subjectArea: 'art',
//   // numOfResources: '1',
//   // topic: '',
//   // paperDetails: ''

//   [1, { priceInCents: 10000, name: 'Learn React Today', type: 'some Type' }],
//   [2, { priceInCents: 20000, name: 'Learn CSS Today', type: 'some Type' }],
// ]);

// exports.createCheckoutSessionsPOST = async (req, res) => {
//   console.log('GET /Create checkout session');
//   try {
//     // let result = req.body.items.map((item) => {
//     //   const storeItem = storeItems.get(item.id);
//     //   return {
//     //     name: storeItem.name,
//     //     name2: item.name,
//     //     type: storeItem.type,
//     //     value: item.value,
//     //   };
//     // });
//     // console.log("The result", result)
//     // console.log(req.body.items[0].currency)
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       mode: 'payment',
//       line_items: req.body.items.map((item) => {
//         const storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInCents,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       // success_url: `${process.env.CLIENT_URL}/success.html`,
//       // cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
//       success_url: `http://localhost:8080/`,
//       cancel_url: `http://localhost:8080/pricing`,
//     });
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };

exports.orderID = async (req, res) => {
  console.log("/GET /order/:uuid");
  try {
    const uuid = req.params.uuid;
    const authorised = req.cookies["_aut121421"];
    if (!authorised) {
      res.redirect("/login");
    } else {
      try {
        const [data] = await db.query(`SELECT * FROM orders WHERE uuid = ?`, [
          uuid,
        ]);
        if (data.length !== 0) {
          const rows = data[0];
          res.render("order", { authorised, rows });
        } else {
          res.redirect("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};

exports.profileGET = (req, res) => {
  console.log("GET /profile");
  const authorised = req.cookies["_aut121421"];
  const activeProfile = true;
  const all = true;
  const roleCustomer = true;

  if (!authorised) {
    res.redirect("/login");
  } else {
    //  const data = getUserData(authorised);
    res.render("profile", { authorised, all, activeProfile, roleCustomer });
  }
};

exports.profilePOST = (req, res) => {
  console.log("POST /profile");
  const authorised = req.cookies["_aut121421"];
  if (!authorised) {
    res.redirect("/login");
  } else {
    try {
      const data = req.body;
      const [result] = await;

      // context.response.status = result.status;
      // context.response.message = result.message;
    } catch (err) {
      console.log(err);
    }
  }
};

// Billing
exports.billingGET = (req, res) => {
  console.log("GET /billing");
  const authorised = req.cookies["_aut121421"];
  const activeBilling = true;
  const all = true;
  const roleCustomer = true;
  if (!authorised) {
    res.redirect("/login");
  } else {
    res.render("billing", { authorised, all, activeBilling, roleCustomer });
  }
};
// Billing
exports.billingPOST = (req, res) => {
  // console.log('GET /billing');
  // const authorised = req.cookies['_aut121421'];
  // if (!authorised) {
  //   res.redirect('/login');
  // } else {
  //   res.render('billing', { authorised});
  // }
};

// Security
exports.securityGET = (req, res) => {
  console.log("GET /security");
  const authorised = req.cookies["_aut121421"];
  const activeSecurity = true;
  const all = true;
  const roleCustomer = true;
  if (!authorised) {
    res.redirect("/login");
  } else {
    res.render("security", { authorised, all, activeSecurity, roleCustomer });
  }
};

// Notification-Settings
exports.notificationsGET = (req, res) => {
  console.log("GET /notificcations-settings");
  const authorised = req.cookies["_aut121421"];
  const activeNotifications = true;
  const all = true;
  const roleCustomer = true;

  if (!authorised) {
    res.redirect("/login");
  } else {
    res.render("notifications-settings", {
      authorised,
      all,
      activeNotifications,
      roleCustomer,
    });
  }
};

exports.customerOrdersGET = async (req, res) => {
  console.log("GET /customer-orders");
  const authorised = req.cookies["_aut121421"];
  const activeCustomerOrders = true;
  const roleCustomer = true;
  if (!authorised) {
    res.redirect("/login");
  } else {
    try {
      const [data] = await db.query(
        `SELECT * FROM orders WHERE user_email= ?`,
        [authorised]
      );

      res.render("customer-orders", {
        authorised,
        activeCustomerOrders,
        data,
        roleCustomer,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

exports.summaryGET = (req, res) => {
  console.log("GET /summary");
  const authorised = req.cookies["_aut121421"];
  if (!authorised) {
    res.redirect("/login");
  } else {
    res.render("summary", {
      authorised,
    });
  }
};

exports.summaryCompleteGET = (req, res) => {
  console.log("GET /summary-complete");
  const authorised = req.cookies["_aut121421"];
  if (!authorised) {
    res.redirect("/login");
  } else {
    res.render("summary-complete", {
      authorised,
    });
  }
};

exports.configGET = (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
  });
};

const calculateOrderAmount = (items) => {
  items.forEach(async (item) => {
    const name = item.name;
    const quantity = item.quantity;
    // const {id} = await db.query('SELECT price FROM items WHERE name = ?', [name])
    const { id, user_email } = await db.query("SELECT * FROM accounts");
  });

  return 1400;
};

exports.createPaymentIntentPOST = async (req, res) => {
  const { items } = req.body;
  console.log(items);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    // amount: calculateOrderAmount(items),
    amount: "1222",
    currency: items[0].currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  // console.log(paymentIntent);
  if (paymentIntent.status === "succeeded") {
    console.log("IT WORKED");
    // Save the metadata to your server
    // For example, you could save it to a database or send it in an email
  }
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

exports.testingPOST = (req, res) => {
  console.log("POST /testing");

  const data = req.body;

  console.log(data);

  res.render("tst");
};
