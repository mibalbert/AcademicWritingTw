const express = require('express');
const router = express.Router();
const userController = require('./modules/userController');

const login = require('./modules/accounts');
const {
  getSlickOrders,
  getUserOrders,
  getOrderDetails,
  createCustomerOrder,
} = require('./modules/orders');

///////HOME page routes

router.get('/', (req, res) => {
  console.log('GET / /');
  const authorised = req.cookies['authorised'];
  res.render('home', { authorised });
});

///////LOGIN & REGISTER routes

const db = require('./modules/db');

router.get('/login', async (req, res) => {
  console.log('GET /login');
  const authorised = req.cookies['authorised'];
  res.render('login', { authorised });

  // res.cookie('adsasdasd', 'adasdadsas')
});

router.post('/login', async (req, res) => {
  console.log('POST /login');
  const data = req.body.payload;

  login(data, (err, result) => {
    if (err) {
      console.log('The error', err);
    } else {
      if (result.authenticated) {



        res.setHeader('Set-Cookie', `${'authorised'}=${data.inputLogEmail}`);

//         req.session.myKey = 'myValue'; // set session storage
//         res.send('Done')

// const myCookie = cookie.serialize('myCookie', 'myValue', options);

// res.setHeader('Set-Cookie', myCookie);

//         res
//           .cookie('authorised', data.inputLogEmail)
//           .status(result.code)
//           .send(result.message)
          res.redirect('/customer-home');
      } else {
        res.status(result.code).send(result.message);
      }
    }
  });
});

router.get('/register', async (context) => {
  console.log('GET /register');

  const authorised = req.cookies['authorised'];
  res.render('register', { authorised });
});

router.post('/register', async (context) => {
  console.log('POST /register');
  const body = context.request.body({ type: 'json' });
  const value = await body.value;
  const result = await register(value.payload, context);
  context.response.status = result.status;
  context.response.message = result.message;
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
  res.clearCookie('authorised');
  res.clearCookie('role');
  res.clearCookie('name');
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

/////// CUSTOMER HOME

router.get('/customer-home', (req, res) => {
  console.log('GET /customer-home');

  const authorised = req.cookies['authorised'];
  const permission = req.cookies['permission'];
  const user = req.cookies['user'];

  // if (!authorised) {
  // res.redirect('/login');
  // }
  const data = getSlickOrders(authorised);
  res.render('customer-home', {
    authorised,
    user,
    data,
  });
});

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
