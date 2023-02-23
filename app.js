/** app.js */

const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

app.use(cookieParser());

// Static Files
app.use(express.static('public'));

// Templating Engine
const handlebars = exphbs.create({
  extname: '.hbs',
  defaultLayout: false,
});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');
app.set('views', 'server/views');

const routes = require('./server/router');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
