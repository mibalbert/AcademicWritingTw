/** router.js */

const express = require('express');
const router = express.Router();
const flash = require('express-flash');

const userController = require('./modules/userController');
const { login, register } = require('./modules/accounts');
const { encrypt, decrypt } = require('./modules/utils');
const {
  getSlickOrders,
  getUserOrders,
  getOrderDetails,
  createCustomerOrder,
} = require('./modules/orders');



const bcrypt = require('bcrypt');


///////HOME page routes

router.get('/', (req, res) => {
  console.log('GET / /');
  // const cookieValue = req.cookies.authorised;
  // if (!cookieValue == undefined) {
  //   const authorised = decrypt(cookieValue);
  // res.render('home', { authorised , success: req.flash('success')});
  // }
  res.render('home', {
    role: res.cookie('_ro2e12s3'),
    authorised: req.cookies['_aut121421'],
  });
});



router.get('/testing', (req, res) => {
  console.log('GET /Testing');

  const saltRounds = 10;
 
  const inputPassword = 'p455w0rd'
  
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(inputPassword, salt);

  // console.log(hashedPassword)
  
  const result =  bcrypt.compareSync( 'p455w0rd','$2b$10$4VmT8yTGEEoHx3xeckuEq.xO88MDJR/ICWITGawr5C2yJixdBA.Pm')
  console.log(result)



  // res.send(hashedPassword)
  res.send(result)

});





////////// CUSTOMER_HOME

router.get('/customer-home', (req, res) => {
  console.log('GET /customer-home');
  // let authorised;
  // const cookieValue = req.cookies.authorised;
  // if (cookieValue !== undefined) {
    //   authorised = decrypt(cookieValue);
    
   const  userFirstName=  req.cookies['_firN21kll21']
  const authorised = req.cookies['_aut121421']
  console.log("userFirstName", userFirstName)


  if (!authorised) {
    res.redirect('/login');
  }
  // if (!authorised || !role==='customer')
  // const role = req.cookies['_ro2e12s3'],
    
  const data = getSlickOrders(authorised);
  res.render('customer-home', {
    data: data,
    // role: res.cookie('_ro2e12s3'),
    authorised: authorised,
    // userFirstName: req.cookies['_firN21kll21'],
    userLastName: req.cookies['_sltN21kll21'],
    success: req.flash('success'),
    registered: req.flash('registered'),
  });

  // Redirect the user to the login page if they are not authorised
});

///////LOGIN & REGISTER routes

const db = require('./modules/db');

router.get('/login', async (req, res) => {
  console.log('GET /login');

  res.render('login', {
    success: req.flash('success'),
    error: req.flash('error'),
  });
});

router.post('/login', async (req, res) => {
  console.log('POST /login');

  const data = req.body;

  console.log("THE DATA",data)

  login(data)
    .then((result) => {
      // handle successful login
      console.log("THE FUCKING RESULT",result);
      console.log("THE FUCKING RESULT.ROLE",result.role);
      req.flash('success', `${result.message}`);
      res.cookie('_aut121421', `${data.inputLogEmail}`);
      res.cookie('_ro2e12s3', `${result.role}`);
      res.cookie('_firN21kll21', `${result.userFirstName}`);
      res.cookie('_sltN21kll21', `${result.userLastName}`);
      req.session.save(() => {
        res.redirect('/customer-home');
      });
    })
    .catch((error) => {
      // handle login error
      console.error(error);
      req.flash('error', `${error}`);
      req.session.save(() => {
        res.redirect('/login');
      });
    });
});

router.get('/register', (req, res) => {
  console.log('GET /register');
  res.render('register', {
    error: req.flash('error'),
  });
});

router.post('/register', (req, res) => {
  console.log('POST /register');
  const data = req.body;

  console.log(data);

  register(data)
    .then((result) => {
      // handle successful registration
      console.log(result);
      req.flash('registered', `${result.message}`);
      res.cookie('_aut121421', `${data.email}`);
      res.cookie('_ro2e12s3', `customer`);
      res.cookie('_firN21kll21', `${data.inputFirstName}`);
      res.cookie('_sltN21kll21', `${data.inputLastName}`);
      req.session.save(() => {
        res.redirect('/Customer-home');
      });
    })
    .catch((error) => {
      // handle registration error
      console.error('THE ERROR', error);
      req.flash('error', `${error}`);
      req.session.save(() => {
        res.redirect('/register');
      });
    });
});

// router.get('/confirm', (ctx) => {
// 	const confirmationCode = ctx.request.url.searchParams.get('code');
// 	let confirmed = false;
// 	// Look up the email address associated with the confirmation code
// 	for (const email in users) {
// 		if (users[email].confirmationCode === confirmationCode) {
// 			// Mark the email address as confirmed in the database
// 			users[email].confirmed = true;
// 			confirmed = true;
// 			break;
// 		}
// 	}
// 	ctx.response.body = { confirmed };
// });

router.get('/logout', (req, res) => {
  console.log('GET /logout');
  res.clearCookie('_aut121421');
  res.clearCookie('_ro2e12s3');
  res.clearCookie('_fN21kll21');
  res.clearCookie('_sltN21kll21');
  res.redirect('/');
});

// /////// ADMIN DASHBOARD

// router.get('/dashboard', async (context) => {
// 	console.log('GET /dashboard');
// 	// const authorised = context.cookies.get('authorised');
// 	// const permission = context.cookies.get('permission');
// 	// if (!authorised && permission !== 'admin'){
// 	// 	context.response.redirect('/login')
// 	// }
// 	// const body = await handle.renderView('dashboard', { authorised });
// 	const body = await handle.renderView('dashboard');
// 	context.response.body = body;
// });

// /////// ABOUT

router.get('/about', (req, res) => {
  console.log('GET /about');
  const authorised = req.cookies['authorised'];
  res.render('about', { authorised });
});

// /////// PRICING

router.get('/pricing', (req, res) => {
  console.log('GET /pricing');
  const authorised = req.cookies['authorised'];
  res.render('pricing', { authorised });
});

router.post('/pricing', (req, res) => {
  console.log('/POST /pricing');
  const authorised = req.cookies['authorised'];
  const data = req.body;

  console.log('The form data is:', data);

  // const result = createCustomerOrder(data, authorised);
  // console.log("THE RESULT", result)

  // res.redirect('/pricing')
});

// /////// SUMMARY

router.get('/summary', (req, res) => {
  console.log('GET /summary');
  const authorised = req.cookies['authorised'];

  res.render('summary', { authorised });
});

// /////// ORDER:UUID

// router.get('/order/:uuid', async (context) => {
// 	console.log('/GET /order/:uuid');
// 	try {
// 		const uuid = context.params.uuid;
// 		const authorised = await context.cookies.get('authorised');
// 		if (authorised === undefined) context.response.redirect('/login');

// 		const data = await getOrderDetails(uuid);
// 		const body = await handle.renderView('order', { authorised, data });
// 		context.response.body = body;
// 	} catch (err) {
// 		throw new Error(err);
// 	}
// });

// //////// PROFILE

// router.get('/profile', async (context) => {
// 	console.log('GET /profule');
// 	const authorised = context.cookies.get('authorised');
// 	const data = await getUserData(authorised);
// 	const body = await handle.renderView('profile', { authorised, data });
// 	context.response.body = body;
// });

// router.put('/profile', async (context) => {
// 	console.log('POST /profile');
// 	const authorised = context.cookies.get('authorised');
// 	const body = context.request.body({ type: 'json' });
// 	const value = await body.value;
// 	const result = await updateProfile(authorised, value.payload, context);
// 	console.log(result);
// 	context.response.status = result.status;
// 	context.response.message = result.message;
// });

// //////// BILING

// router.get('/billing', async (context) => {
// 	console.log('GET /billing');
// 	const authorised = context.cookies.get('authorised');
// 	const body = await handle.renderView('billing', { authorised });
// 	context.response.body = body;
// });

// //////// SECURITY

// router.get('/security', async (context) => {
// 	console.log('GET /security');
// 	const authorised = context.cookies.get('authorised');

// 	const body = await handle.renderView('security', { authorised });
// 	context.response.body = body;
// });

// //////// NOTIFICATIONS

// router.get('/notifications-settings', async (context) => {
// 	console.log('GET /notificatinos-settings');
// 	const authorised = context.cookies.get('authorised');

// 	const body = await handle.renderView('notifications-settings', {
// 		authorised,
// 	});
// 	context.response.body = body;
// });

// //////// ORDERS

// router.get('/customer-orders', async (context) => {
// 	console.log('GET /customer-orders');
// 	const authorised = context.cookies.get('authorised');

// 	const data = await getUserOrders(authorised);

// 	const body = await handle.renderView('customer-orders', {
// 		authorised,
// 		data,
// 	});
// 	context.response.body = body;
// });

module.exports = router;
