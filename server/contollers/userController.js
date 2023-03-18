/** userController.js */

const db = require("../modules/db.js");
require("dotenv").config();

const argon2 = require("argon2");
const axios = require("axios");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const geoip = require("geoip-lite");
const moment = require("moment-timezone");

const {
  createCustomerOrder,
  generateProductId,
} = require("../modules/orders.js");
const session = require("express-session");

const SALTROUNDS = 10;

// Home
exports.homeGET = (req, res) => {
  console.log("GET //");
  const roleData = req.cookies["_ro2e12s3"];
  let roleCustomer = false;
  let roleAdmin = false;

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
    systemError: req.flash("systemError"),
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
      // req.session.save(() => {
      res.redirect("/login");
      // });
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
      // return req.session.save(() => {
      if (data.role !== "customer") {
        res.redirect("/admin-home");
      } else {
        res.redirect("/customer-home");
      }
      // });
    } else {
      req.flash("passError", "Incorrect password");
      // return req.session.save(() => {
      res.redirect("/login");
      // });
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
      // req.session.save(() => {
      res.redirect("/register");
      // });
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
      // req.session.save(() => {
      res.redirect("/customer-home");
      // });
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
  // const conn = await db.getConnection();
  try {
    const [rows] = await db.execute(
      "SELECT * FROM orders WHERE user_email = ? ORDER BY id DESC LIMIT 3",
      [authorised]
    );
    // console.log("THE FUCKING ROWS", rows);
    // const successMessage = req.flash("success");
    // const successMessageReg = req.flash("registered");
    // req.flash("success", null);

    res.render("customer-home", {
      rows,
      authorised,
      userFirstName,
      roleCustomer,
      // success: successMessage,
      // registered: successMessageReg,
      activeHome,
    });
    // req.flash("success", null);
    // req.flash("registered", null);
  } catch (err) {
    console.log(err);
    res.redirect("/customer-home");
  }
  // finally {
  //   conn.release();
  // }
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

exports.profileGET = async (req, res) => {
  console.log("GET /profile");
  const authorised = req.cookies["_aut121421"];
  const activeProfile = true;
  const all = true;
  const roleCustomer = true;
  // const firstName = req.cookies["_firN21kll21"];
  // const lastName = req.cookies["_sltN21kll21"];

  if (!authorised) {
    res.redirect("/login");
  } else {
    //  const data = getUserData(authorised);

    try {
      const [userData] = await db.query(
        "SELECT * FROM accounts WHERE user_email= ?",
        [authorised]
      );

      console.log(userData);

      res.render("profile", {
        firstName: userData[0].user_first_name,
        lastName: userData[0].user_last_name,
        country: userData[0].user_country,
        city: userData[0].user_city,
        phoneNumber: userData[0].user_telephone,
        authorised,
        all,
        activeProfile,
        roleCustomer,
        updated: req.flash("updated"),
      });
      // console.log(userData);
    } catch (error) {
      console.log(error);
    }
  }
};

exports.profilePOST = async (req, res) => {
  console.log("POST /profile");

  const authorised = req.cookies["_aut121421"];
  if (!authorised) {
    res.redirect("/login");
  } else {
    const data = req.body;
    try {
      const [result] = await db.query(
        `UPDATE accounts SET user_first_name = ?, \
      user_last_name = ?, user_telephone = ?, user_country = ?,\
       user_city = ? WHERE user_email='${authorised}'`,
        [data.firstName, data.lastName, data.phone, data.country, data.city]
      );
      console.log(result);

      res.send("IT WORKED");
    } catch (err) {
      console.log(err);
    }
  }
  // res.status(200);
};

// Billing
exports.billingGET = async (req, res) => {
  console.log("GET /billing");
  const authorised = req.cookies["_aut121421"];
  const activeBilling = true;
  const all = true;
  const roleCustomer = true;

  if (!authorised) {
    res.redirect("/login");
  } else {
    try {
      const result = await db.query(
        "SELECT * FROM billing WHERE user_email = ? ORDER BY id DESC ",
        [authorised]
      );

      // console.log(result[0]);

      res.render("billing", {
        authorised,
        data: result[0],
        all,
        activeBilling,
        roleCustomer,
      });
    } catch (err) {
      console.log(err);
    }
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

exports.securityPOST = async (req, res) => {
  console.log("POST /security");
  const authorised = req.cookies["_aut121421"];
  if (!authorised) {
    res.redirect("/login");
  } else {
    const data = req.body;
    try {
      const [re] = await db.query(
        "SELECT pass FROM accounts WHERE user_email=? ",
        [authorised]
      );
      const isPasswordValid = await argon2.verify(
        re[0].pass,
        data.currentPassword
      );
      if (isPasswordValid) {
        const hashedNewPassword = await argon2.hash(data.newPassword);
        const [result] = await db.query(
          "UPDATE accounts SET pass = ? WHERE user_email = ?",
          [hashedNewPassword, authorised]
        );
        console.log(result);
        res.send("Congratulations! You have changed your password");
      } else {
        res.send(`Passwords don't match`);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// Notification-Settings
exports.notificationsGET = async (req, res) => {
  console.log("GET /notificcations-settings");
  const authorised = req.cookies["_aut121421"];
  const activeNotifications = true;
  const all = true;
  const roleCustomer = true;

  if (!authorised) {
    res.redirect("/login");
  } else {
    try {
      const [result] = await db.query(
        "SELECT subscribed FROM accounts WHERE user_email=?",
        [authorised]
      );
      console.log(result[0].subscribed);
      let subscribed;
      if (result[0].subscribed === 1) {
        subscribed = true;
      } else {
        subscribed = false;
      }
      res.render("notifications-settings", {
        authorised,
        all,
        sub: subscribed,
        activeNotifications,
        roleCustomer,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
exports.notificationsPOST = async (req, res) => {
  console.log("GET /notifications-settings");
  const authorised = req.cookies["_aut121421"];
  if (!authorised) {
    res.redirect("/login");
  } else {
    const data = req.body;
    try {
      console.log(data);
      let sub;
      if (data.checked == true) {
        sub = 1;
      } else {
        sub = 0;
      }

      const [result] = await db.query(
        "UPDATE accounts SET subscribed = ? WHERE user_email = ?",
        [sub, authorised]
      );

      res.send(
        "Congratulations! You have changed your notifications settings!"
      );
    } catch (error) {
      console.log(error);
      res.send(error);
    }
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
        `SELECT * FROM orders WHERE user_email= ? ORDER BY id DESC`,
        [authorised]
      );

      // console.log(data);

      res.render("customer-orders", {
        authorised,
        // activeCustomerOrders,
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
  console.log(authorised);
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
  console.log("GET /config");
  res.send({
    publishableKey: process.env.STRIPE_PUBLIC_KEY,
  });
};

exports.createPaymentIntentPOST = async (req, res) => {
  console.log("POST /create-payment-intent");
  const data = req.body;
  const authorised = req.cookies["_aut121421"];

  // function getPriceByName(name) {
  //   const item = Array.from(itemsData.keys()).find((key) => key.name === name);
  //   if (item) {
  //     // console.log(item);
  //     // console.log(itemsData.get(item).price);
  //     return itemsData.get(item).price;
  //   }
  //   return null;
  // }

  const params = {
    payment_method_types: ["card"],
    amount: data.total,
    // currency: currency,
    currency: "eur",
    metadata: {
      // orderID: dorderID,
      authorised: authorised,
      currency: data.currency,
      typeService: data.typeService,
      typePaper: data.typePaper,
      numOfPages: data.numOfPages,
      numOfResources: data.numOfResources,
      academicLevel: data.academicLevel,
      urgency: data.urgency,
      format: data.format,
      subjectArea: data.subjectArea,
      topic: data.topic,
      details: data.details,
    },
    // description: `${data.details}`,
  };
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

exports.webhookPOST = async (req, res) => {
  let data, eventType;
  console.log("POST /webhook");

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
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === "payment_intent.succeeded") {
    console.log("💰 Payment captured!");

    const now = new Date();

    try {
      const paymentStatus = eventType.split(".");
      // console.log(paymentStatus);
      const user_email = data.object.metadata.authorised;
      // console.log("THIS USER_EMAIL", user_email);

      const currency = data.object.metadata.currency;
      // console.log("THIS CURRENCY", currency);

      const authorised = data.object.metadata.authorised;
      // console.log("THIS AUTHORISED", authorised);

      const type_service = data.object.metadata.typeService;
      // console.log("THIS TYPE_SERVICE", type_service);

      const type_paper = data.object.metadata.typePaper;
      // console.log("THIS TYPE_PAPER", type_paper);

      const number_of_pages = data.object.metadata.numOfPages;
      // console.log("THIS NUMBER_OF_PAGES", number_of_pages);

      const number_of_resources = data.object.metadata.numOfResources;
      // console.log("THIS NUMBER_OF_RESOURCES", number_of_resources);

      const academic_level = data.object.metadata.academicLevel;
      // console.log("THIS ACADEMIC_LEVEL", academic_level);

      const title = data.object.metadata.topic;
      // console.log("THIS TITLE", title);

      const description = data.object.metadata.details;
      // console.log("THIS DESCRIPTION", description);

      const urgency = data.object.metadata.urgency;
      // console.log("THIS URGENCY", urgency);

      const format = data.object.metadata.format;
      // console.log("THIS FORMAT", format);

      const subject_area = data.object.metadata.subjectArea;
      // console.log("THIS SUBJECT_AREA", subject_area);

      // Get the user's IP address from the request headers
      const ipAddress =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      // Get the user's location based on their IP address
      const geo = geoip.lookup(ipAddress);

      if (geo) {
        // Get the user's timezone based on their location
        const timezone = geo.timezone;

        // Get the current time in the user's timezone
        const currentTime = moment().tz(timezone);
        const uuid = generateProductId();

        // console.log(currentTime.format()); // Output the current time in ISO 8601 format
        const [result] = await db.query(
          `INSERT INTO orders   \
          (
            user_email,\
            currency,\
            type_service,\
            type_paper,\
            number_of_pages,\
            number_of_resources,\
            academic_level,\
            title,\
            description,\
            urgency,\
            format,\
            subject_area,\
            payment_status,\
            date_time_created,\
            uuid ) \
          VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?)`,
          [
            user_email,
            currency,
            type_service,
            type_paper,
            number_of_pages,
            number_of_resources,
            academic_level,
            title,
            description,
            urgency,
            format,
            subject_area,
            paymentStatus[1],
            currentTime.format(),
            uuid,
          ]
        );
        // console.log("DATA OBJECT", data.object);

        const [result2] = await db.query(
          "INSERT INTO billing (uuid, user_email, date_time_created, ammount_paid, status) VALUES (?,?,?,?,?)",
          [
            uuid,
            authorised,
            currentTime.format(),
            data.object.amount,
            paymentStatus[1],
          ]
        );
      }

      // res.sendStatus(200);
    } catch (error) {
      console.error(error);
      // res.sendStatus(500);
    }
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
    // res.sendStatus(200);
  }
  res.sendStatus(200);
};

exports.testingGET = (req, res) => {
  console.log("GET /testing");
  const authorised = req.cookies["_aut121421"];
  console.log(authorised);
  res.send(authorised);
  // res.sendStatus(200);
};
exports.testingPOST = (req, res) => {
  console.log("POST /testing");
  const authorised = req.cookies["_aut121421"];
  console.log(authorised);
  res.send(authorised);
  // res.sendStatus(200);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// View Users
exports.adminHomeGET = async (req, res) => {
  console.log("GET /admin-home");

  const [result] = await db.query(
    'SELECT COUNT(*) FROM accounts WHERE status="active"'
  );
  const totalActiveUsers = result[0]["COUNT(*)"];
  // console.log(totalActiveUsers);

  res.render("admin-home", {
    layout: "admin-layout.hbs",
    totalActiveUsers: totalActiveUsers,
    totalActiveOrders: 10,
    ordersAccepted: 5,
    ordersToAccept: 5,
    totalAllOrders: 54,
  });

  // db.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
  //   // When done with the connection, release it
  //   if (!err) {
  //     let removedUser = req.query.removed;
  //     res.render("admin-home", { rows, removedUser });
  //   } else {
  //     console.log(err);
  //   }
  //   console.log("The data from user table: \n", rows);
  // });
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  db.query(
    "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("add-user");
};

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  // User the db
  db.query(
    "INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
    [first_name, last_name, email, phone, comments],
    (err, rows) => {
      if (!err) {
        res.render("add-user", { alert: "User added successfully." });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Edit user
exports.edit = (req, res) => {
  // User the db
  db.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows) => {
    if (!err) {
      res.render("edit-user", { rows });
    } else {
      console.log(err);
    }
    console.log("The data from user table: \n", rows);
  });
};

// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the db
  db.query(
    "UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
    [first_name, last_name, email, phone, comments, req.params.id],
    (err, rows) => {
      if (!err) {
        // User the db
        db.query(
          "SELECT * FROM user WHERE id = ?",
          [req.params.id],
          (err, rows) => {
            // When done with the db, release it

            if (!err) {
              res.render("edit-user", {
                rows,
                alert: `${first_name} has been updated.`,
              });
            } else {
              console.log(err);
            }
            console.log("The data from user table: \n", rows);
          }
        );
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Delete User
exports.delete = (req, res) => {
  // Delete a record

  // User the db
  // db.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  db.query(
    "UPDATE user SET status = ? WHERE id = ?",
    ["removed", req.params.id],
    (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent("User successeflly removed.");
        res.redirect("/?removed=" + removedUser);
      } else {
        console.log(err);
      }
      console.log("The data from beer table are: \n", rows);
    }
  );
};

// View Users
exports.viewall = (req, res) => {
  // User the db
  db.query("SELECT * FROM user WHERE id = ?", [req.params.id], (err, rows) => {
    if (!err) {
      res.render("view-user", { rows });
    } else {
      console.log(err);
    }
    console.log("The data from user table: \n", rows);
  });
};
