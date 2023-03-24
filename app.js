/** app.js */

const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const cors = require("cors");
const moment = require("moment");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser("NotSoSecret"));
app.use(
  session({
    secret: "something",
    // cookie: { maxAge: 600000000 },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Static Files
app.use(express.static("public"));

// app.use(
//   bodyParser.json({
//     // Because Stripe needs the raw body, we compute it but only when hitting the Stripe callback URL.
//     verify: function (req, res, buf) {
//       var url = req.originalUrl;
//       if (url.startsWith("/stripe-webhooks")) {
//         req.rawBody = buf.toString();
//       }
//     },
//   })
// );

// Templating Engine
const handlebars = exphbs.create({
  extname: ".hbs",
  helpers: {
    formatDate: (dateString) => {
      var date = moment(dateString);
      return date.format("MMM D, YYYY");
    },
    addOne: function (index) {
      return index + 1;
    },
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
    // ifSubscribed: function (arg1, options) {
    //   if (arg1 == 1) {
    //     return { checked: "checked" };
    //   } else {
    //     return { checked: "unchecked" };
    //   }
    // },

    // capitalize: (str) => {
    //   return str.toUpperCase() + str.slice(1);
    // },
    // pluralize: (str, count) => {
    //   if (count === 1) {
    //     return `${count} ${str}`;
    //   }
    //   return `${count} ${str}s`;
    // }
    // status: (str) => {
    //   if(str === 'in-progress') return true
    //   return false
    // }
  },
});

app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");
app.set("views", "server/views");

const routes = require("./server/routes/router");
app.use("/", routes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
