const db = require('../modules/db.js');

const bcrypt = require('bcrypt');

const flash = require('express-flash');

const SALTROUNDS = 10;

// Login Users
exports.loginGET = (req, res) => {
  console.log('GET /login');
  res.render('login', {
    emailError: req.flash('emailError'),
    passError: req.flash('passError'),
  });
};

exports.loginPOST = async (req, res) => {
  console.log('POST /login');
  const { inputLogEmail, inputLogPassword } = req.body;

  const conn = await db.getConnection();
  try {
    const [rows] = await db.execute('SELECT * FROM accounts WHERE user_email = ?', [
      inputLogEmail,
    ]);
    console.log(rows)

    if (!rows || !rows[0]) {
      req.flash('emailError', 'Email not found');
      // return req.session.save(() => {
        res.redirect('/login');
      // });
    }

    const { user_email, pass, user_first_name, user_last_name, role } = rows[0];

    if (bcrypt.compareSync(inputLogPassword, pass)) {
      console.log('IT WORKED!')
      req.flash('success', `Successfully Logged in as ${user_email}`);
      res.cookie('_aut121421', `${user_email}`);
      res.cookie('_ro2e12s3', `${role}`);
      res.cookie('_firN21kll21', `${user_first_name}`);
      res.cookie('_sltN21kll21', `${user_last_name}`);
      // req.session.save(() => {
        res.redirect('/customer-home');
      // });
    } else {
      req.flash('passError', 'Incorrect password');
      // return req.session.save(() => {
        res.redirect('/login');
      // });
    }

    // rest of the code here
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  } finally {
    conn.release();
  }

  // db.query(
  //   'SELECT * FROM accounts WHERE user_email = ?',
  //   [inputLogEmail],
  //   (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //       return res.redirect('/login');
  //     }
  //     if (!rows || !rows[0]) {
  //       req.flash('emailError', 'Email not found');
  //       return req.session.save(() => {
  //         res.redirect('/login');
  //       });
  //     }
  //     const { user_email, pass, user_first_name, user_last_name, role } =
  //       rows[0];
  //     console.log(role);

  //     if (bcrypt.compareSync(inputLogPassword, pass)) {
  //       req.flash('success', `Successfully Logged in as ${user_email}`);
  //       res.cookie('_aut121421', `${user_email}`);
  //       res.cookie('_ro2e12s3', `${role}`);
  //       res.cookie('_firN21kll21', `${user_first_name}`);
  //       res.cookie('_sltN21kll21', `${user_last_name}`);
  //       req.session.save(() => {
  //         res.redirect('/customer-home');
  //       });
  //     } else {
  //       req.flash('passError', 'Incorrect password');
  //       return req.session.save(() => {
  //         res.redirect('/login');
  //       });
  //     }
  //   }
  // );
};

// Customer-Home
exports.customerHomeGET = (req, res) => {
  console.log('GET /customer-home');
  const authorised = req.cookies['_aut121421'];
  const userFirstName = req.cookies['_firN21kll21'];
  const roleData = res.cookie('_ro2e12s3');
  let roleCustomer = true;

  if (!authorised) {
    res.redirect('/login');
  }

  db.query(
    `SELECT * FROM orders WHERE user_email = ?`,
    [authorised],
    (err, rows) => {
      if (!err) {
        console.log(rows);

        res.render('customer-home', {
          data: rows[0],
          authorised: authorised,
          userFirstName: userFirstName,
          roleCustomer: roleCustomer,
          success: req.flash('success'),
          registered: req.flash('registered'),
        });
      } else {
      }
    }
  );

  // getSlickOrders(authorised)
  //   .then(() => {
  //     if (roleData === 'customer') {
  //       roleCustomer = true;
  //     } else {
  //       roleAdmin = true;
  //     }
  //     res.render('customer-home', {
  //       data: orders.records,
  //       authorised: authorised,
  //       userFirstName: userFirstName,
  //       roleCustomer: roleCustomer,
  //       roleAdmin: roleAdmin,
  //       success: req.flash('success'),
  //       registered: req.flash('registered'),
  //     });
  //   })
  //   .catch(() => {
  //   });
};

exports.testing = async (req, res) => {
  console.log('GET /testing');

  const conn = await db.getConnection();
  try {
    const [rows] = await db.execute('SELECT * FROM accounts WHERE id = ?', [
      req.params.id,
    ]);

    res.render('tst', { rows });

    // rest of the code here
  } catch (err) {
    console.log(err);
    res.redirect('/');
  } finally {
    conn.release();
  }
};

// // Find User by Search
// exports.find = (req, res) => {
//   let searchTerm = req.body.search;
//   // User the connection
//   connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
//     if (!err) {
//       res.render('home', { rows });
//     } else {
//       console.log(err);
//     }
//     console.log('The data from user table: \n', rows);
//   });
// }

// exports.form = (req, res) => {
//   res.render('add-user');
// }

// // Add new user
// exports.create = (req, res) => {
//   const { first_name, last_name, email, phone, comments } = req.body;
//   let searchTerm = req.body.search;

//   // User the connection
//   connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
//     if (!err) {
//       res.render('add-user', { alert: 'User added successfully.' });
//     } else {
//       console.log(err);
//     }
//     console.log('The data from user table: \n', rows);
//   });
// }

// // Edit user
// exports.edit = (req, res) => {
//   // User the connection
//   connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
//     if (!err) {
//       res.render('edit-user', { rows });
//     } else {
//       console.log(err);
//     }
//     console.log('The data from user table: \n', rows);
//   });
// }

// // Update User
// exports.update = (req, res) => {
//   const { first_name, last_name, email, phone, comments } = req.body;
//   // User the connection
//   connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

//     if (!err) {
//       // User the connection
//       connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
//         // When done with the connection, release it

//         if (!err) {
//           res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
//         } else {
//           console.log(err);
//         }
//         console.log('The data from user table: \n', rows);
//       });
//     } else {
//       console.log(err);
//     }
//     console.log('The data from user table: \n', rows);
//   });
// }

// // Delete User
// exports.delete = (req, res) => {

//   // Delete a record

//   // User the connection
//   // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

//   //   if(!err) {
//   //     res.redirect('/');
//   //   } else {
//   //     console.log(err);
//   //   }
//   //   console.log('The data from user table: \n', rows);

//   // });

//   // Hide a record

//   connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
//     if (!err) {
//       let removedUser = encodeURIComponent('User successeflly removed.');
//       res.redirect('/?removed=' + removedUser);
//     } else {
//       console.log(err);
//     }
//     console.log('The data from beer table are: \n', rows);
//   });

// }

// // View Users
// exports.viewall = (req, res) => {

//   // User the connection
//   connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
//     if (!err) {
//       res.render('view-user', { rows });
//     } else {
//       console.log(err);
//     }
//     console.log('The data from user table: \n', rows);
//   });

// }
