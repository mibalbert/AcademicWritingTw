/** userController.js */

const db = require("../modules/db.js");
require("dotenv").config();

const argon2 = require("argon2");

const bcrypt = require("bcrypt");
const flash = require("express-flash");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const dateNow = new Date();

const {
  createCustomerOrder,
  generateProductId,
} = require("../modules/orders.js");

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
  const authorised = req.cookies["_aut121421"];
  res.render("login", {
    authorised: authorised,
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
  const authorised = req.cookies["_aut121421"];
  res.render("register", {
    authorised: authorised,
    error: req.flash("error"),
  });
};
exports.registerPOST = async (req, res) => {
  console.log("POST /register");
  const authorised = req.cookies["_aut121421"];
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
  }
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
    console.log("THE FUCKING ERROR FROM CUSTOMER HOME", err);
    res.redirect("/customer-home");
  } finally {
    conn.release();
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

exports.createPaymentIntentPOST = async (req, res) => {
  // const {paymentMethodType, currency,paymentMethodOptions} = req.body;

  let currency = "eur";
  // Each payment method type has support for different currencies. In order to
  // support many payment method types and several currencies, this server
  // endpoint accepts both the payment method type and the currency as
  // parameters. To get compatible payment method types, pass
  // `automatic_payment_methods[enabled]=true` and enable types in your dashboard
  // at https://dashboard.stripe.com/settings/payment_methods.
  //
  // Some example payment method types include `card`, `ideal`, and `link`.
  const params = {
    payment_method_types: ["card"],
    amount: 5999,
    currency: currency,
  };

  // If this is for an ACSS payment, we add payment_method_options to create
  // the Mandate.
  // if (paymentMethodType === "acss_debit") {
  //   params.payment_method_options = {
  //     acss_debit: {
  //       mandate_options: {
  //         payment_schedule: "sporadic",
  //         transaction_type: "personal",
  //       },
  //     },
  //   };
  // } else if (paymentMethodType === "konbini") {
  //   /**
  //    * Default value of the payment_method_options
  //    */
  //   params.payment_method_options = {
  //     konbini: {
  //       product_description: "Tシャツ",
  //       expires_after_days: 3,
  //     },
  //   };
  // } else if (paymentMethodType === "customer_balance") {
  //   params.payment_method_data = {
  //     type: "customer_balance",
  //   };
  //   params.confirm = true;
  //   params.customer =
  //     req.body.customerId ||
  //     (await stripe.customers.create().then((data) => data.id));
  // }

  /**
   * If API given this data, we can overwride it
   */
  // if (paymentMethodOptions) {
  //   params.payment_method_options = paymentMethodOptions;
  // }

  // Create a PaymentIntent with the amount, currency, and a payment method type.
  //
  // See the documentation [0] for the full list of supported parameters.
  //
  // [0] https://stripe.com/docs/api/payment_intents/create
  try {
    const paymentIntent = await stripe.paymentIntents.create(params);

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
      nextAction: paymentIntent.next_action,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
exports.webhookPOST = async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "payment_intent.succeeded") {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log("💰 Payment captured!");
    console.log(data);

    // try {
    //   const result = await db.qury(
    //     `INSERT INTO payments (user_email, amount, date, transaction_id, payment_method, status)
    //         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    //     [
    //       123,
    //       50.0,
    //       dateNow(),
    //       "ABC123XYZ",
    //       "Credit Card",
    //       "Successful",
    //     ]
    //   );

    //   // const [data] = await db.query(`SELECT * FROM accounts`);
    //   console.log(data);
    // } catch (err) {
    //   console.log(err);
    // }
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
    try {
      const [data] = await db.query(`SELECT * FROM accounts`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  res.sendStatus(200);
};
