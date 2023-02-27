/* accounts.js */

const db = require('./db.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;



function testing() {
  // .query('SELECT * FROM accounts', (error, results) => error ? console.error(error) : console.log(results));
}




function login(data) {
  return new Promise(async (resolve, reject) => {
    db.query(
      'SELECT * FROM accounts WHERE user_email = ?',
      [data.inputLogEmail],
      (err, records) => {
        if (!records || !records[0]) {
          reject('Invalid Email / Password');
          return;
        }
        
        const email = records[0].user_email;
        const pass = records[0].pass;
        if (
          email === data.inputLogEmail &&
          bcrypt.compareSync(data.inputLogPassword, pass)
        ) {
          resolve({
            message: `Successfully Logged in as ${records[0].user_email}`,
            userFirstName: records[0].user_first_name,
            userLastName: records[0].user_last_name,
            role: records[0].role,
          });
        } else {
          reject('Invalid Email / Password');
        }
      }
    );
  });
}

function register(data) {
  return new Promise(async (resolve, reject) => {
    const {
      email,
      inputFirstName,
      inputLastName,
      inputCountry,
      city,
      inputPhone,
      inputPassword,
      subscribed,
    } = data;

    // Check if user email already exists
    db.query(
      'SELECT * FROM accounts WHERE user_email = ?',
      [email],
      (err, records) => {
        if (records && records.length > 0) {
          reject('Email already registered');
          return;
        }

        // If email does not exist, hash password and insert user information into database
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(inputPassword, salt);

        db.query(
          'INSERT INTO accounts (user_email, user_first_name, user_last_name, user_country, user_city, user_telephone, pass, subscribed) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            email,
            inputFirstName,
            inputLastName,
            inputCountry,
            city,
            inputPhone,
            hashedPassword,
            subscribed,
          ],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                message: `Hello ${inputFirstName}, Thank you for registering on our platform!`,
              });
            }
          }
        );
      }
    );
  });
}

module.exports = { login, register };
