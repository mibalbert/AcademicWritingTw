/** app.js */

const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('NotSoSecret'));
app.use(
  session({
    secret: 'something',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Static Files
app.use(express.static('public'));

// Templating Engine
const handlebars = exphbs.create({
  extname: '.hbs',
  helpers: {
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
  }
});

app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', 'server/views');

const routes = require('./server/routes/router');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
