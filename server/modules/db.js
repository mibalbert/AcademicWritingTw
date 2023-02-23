/** db.js */

// const mysql = require('mysql');
const mysql = require('mysql');
// const bluebird = require('bluebird');

const db = mysql.createConnection({
  host: 'acad-instance.ccrrwdu5ff9c.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: 'ore!Lmp0123',
  database: 'acad',
});

module.exports = db;
