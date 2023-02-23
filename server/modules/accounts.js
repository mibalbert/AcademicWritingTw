/* accounts.js */

const db = require('./db.js');
const { genSalt, compare } = require('bcrypt');

const saltRounds = 10;



function login(data, callback) {
  db.query('SELECT * FROM accounts WHERE user_email = ?', [data.inputLogEmail], (err, records) => {
    if (err) {
      callback(err, null);
    } else {
      if (records.length === 0) {
        // The email is not in the database
        callback(null, { authenticated: false, code: 404, message: 'Email not found' });
      } else {
        const user = records[0];
        if (compare(user.pass, data.inputLogPassword)) {
          // Password matches, user is authenticated
          callback(null, { authenticated: true, code: 200, user: user });
        } else {
          // Password does not match
          callback(null, { authenticated: false, code: 409, message: 'Incorrect password' });
        }
      }
    }
  });
}

module.exports = login;
