/** router.js */

const express = require("express");
const router = express.Router();

const userController = require("../contollers/userController");

router.get("/", userController.homeGET);
router.get("/login", userController.loginGET);
router.post("/login", userController.loginPOST);
router.get("/register", userController.registerGET);
router.post("/register", userController.registerPOST);
router.get("/logout", userController.logout);
router.get("/customer-home", userController.customerHomeGET);
router.get("/order/:uuid", userController.orderID);
router.get("/pricing", userController.pricingGET);
// router.post('/create-checkout-session', userController.createCheckoutSessionsPOST);
router.get("/about", userController.about);
router.get("/profile", userController.profileGET);
router.post("/profile", userController.profilePOST);
router.get("/billing", userController.billingGET);
router.post("/billing", userController.billingPOST);
router.get("/security", userController.securityGET);
router.post("/security", userController.securityPOST);
router.get("/notifications-settings", userController.notificationsGET);
router.post("/notifications-settings", userController.notificationsPOST);
router.get("/customer-orders", userController.customerOrdersGET);
//Payment Routes
router.get("/summary", userController.summaryGET);
router.get("/summary-complete", userController.summaryCompleteGET);
router.get("/config", userController.configGET);

router.post("/create-payment-intent", userController.createPaymentIntentPOST);
router.post("/webhook", userController.webhookPOST);

//////////////// ADMIN
router.get("/admin-home", userController.adminHomeGET);
/// Amin Orders
router.get("/admin-new-orders", userController.adminNewOrdersGET);
router.get("/admin-accepted-orders", userController.adminAcceptedOrdersGET);
router.get("/admin-all-orders", userController.adminAllOrdersGET);
/// Amin Users
router.get("/admin-view-all-users", userController.adminViewAllUsersGET);
router.get("/admin-create-user", userController.adminCreateUserGET);
router.post("/admin-create-user", userController.adminCreateUserPOST);
router.get("/admin-edit-users", userController.adminEditUsersGET);
router.get("/admin-edit-users/:id", userController.adminEditUsersIdGET);
router.post("/admin-edit-users/:id", userController.adminEditUsersIdPOST);

/////////////////
// router.post("/admin", userController.find);
// router.get("/admin-adduser", userController.form);
// router.post("/admin-adduser", userController.create);
// router.get("/admin-edituser/:id", userController.edit);
// router.post("/admin-edituser/:id", userController.update);
// router.get("/admin-viewuser/:id", userController.viewall);
// router.get("/admin/:id", userController.delete);

// router.post("/testing", userController.testingPOST);
// router.get("/testing", userController.testingGET);

module.exports = router;
