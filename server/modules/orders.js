/* orders.js */

const db = require('./db.js');

function getSlickOrders(email) {
  return new Promise(async (resolve, reject) => {
    db.query(
      `SELECT * FROM orders WHERE user_email = ?`,
      [email],
      (err, records) => {
        if (!records) {
          console.log(records)
          resolve({message:'Found some records', records: records});
        } else {
          reject({message:'No records found'});
        }
      }
    );
  });
}

function getOrderDetails(uuid) {
  try {
    db.query(`SELECT * FROM orders WHERE uuid='${uuid}'`, (err, records) => {
      // When done with the connection, release it
      if (!err) {
        return records;
      } else {
        console.log(err);
      }
      // console.log('The data from user table: \n', records);
    });
  } catch (err) {
    console.log(err);
  }
}

function getUserOrders(authorised) {
  try {
    db.query(
      `SELECT * FROM orders WHERE user_email='${authorised}' LIMIT 3`,
      (err, records) => {
        // When done with the connection, release it
        if (!err) {
          return records;
        } else {
          console.log(err);
        }
        // console.log('The data from user table: \n', records);
      }
    );
  } catch (err) {
    console.log(err);
  }
}

const dateTimeCreated = new Date();

/**
 * Object compriesed of form data
 * inputed by the user
 *
 * @typedef {Object} Details
 * @property {string} recipient_name
 * @property {string} sender_address
 * @property {string} sender_address_details
 * @property {string} sender_city
 * @property {string} sender_country
 * @property {string} recipient_address
 * @property {string} recipient_address_details
 * @property {string} recipient_city
 * @property {string} recipient_postcode
 * @property {string} recipient_country
 * @property {number} weight_kg
 * @property {string} sender_username
 * @property {Date} date_time_created
 * @property {string} uuid
 */
/**
 * Adds a new parcel to the db based on
 * object from the user filled form
 *
 * @param {Details} data
 * @param {string} authorised
 * @returns {bool} returns bool
 */

function createCustomerOrder(data, authorised) {
  const uuid = generateProductId();

  try {
    db.query(
      `INSERT INTO orders          \
			(	
				user_email VARCHAR(255) NOT NULL,\
				user_full_name VARCHAR(255),\
				currency VARCHAR(25),\
				type_service VARCHAR(255),\
				type_paper VARCHAR(255),\
				number_of_pages INT(25),\
				academic_level VARCHAR(255),\
				title VARCHAR(300),\
				description VARCHAR(3000),\
				urgency INT(25),\
				paid VARCHAR(25) DEFAULT 'no',\
				status VARCHAR(45) DEFAULT 'not-accepted', \
				date_time_created DATETIME,\
				date_time_accepted DATETIME,\
				date_time_delivered DATETIME,\
				uuid VARCHAR(255) NOT NULL\
				VALUES ( ?, ?, ?, ?, ?, ?, ?, ?,\
			)`[
        (email,
        data.fields.typeService,
        data.fields.typePaper,
        data.fields.numberOfPages,
        data.fields.academicLevel,
        data.fields.choice,
        dateTimeCreated,
        uuid)
      ]
    ),
      (err, result) => {
        // When done with the connection, release it
        if (!err) {
          return result;
        } else {
          console.log(err);
        }
        console.log('The data from post order: \n', result);
      };
  } catch (err) {
    console.log(err);
  }
}

function generateProductId() {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let productId = '';
  for (let i = 0; i < 7; i++) {
    productId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  console.log(productId);
  return productId;
}

module.exports = {
  getSlickOrders,
  getUserOrders,
  getOrderDetails,
  createCustomerOrder,
};
