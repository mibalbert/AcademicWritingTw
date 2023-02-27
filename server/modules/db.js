  /** db.js */

  const util = require('util');
  const mysql = require('mysql');

  const db = mysql.createConnection({
    host: 'acad-instance.ccrrwdu5ff9c.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: 'ore!Lmp0123',
    database: 'acad',
  });

  const query = util.promisify(connection.query).bind(connection);

  
  module.exports = db;
