/** db.js */

const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: "acad-instance.ccrrwdu5ff9c.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "ore!Lmp0123",
  database: "acad",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;
