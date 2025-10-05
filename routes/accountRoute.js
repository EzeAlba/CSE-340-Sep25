// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index.js")
const accountController = require ("../controllers/accountController")
const regValidate = require('../utilities/account-validation.js')

//route to get the account.ejs view after login
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccount)
);

// Route for login
router.get('/login', utilities.handleErrors(accountController.buildLogin));
// Process the login attempt
router.post(
  '/login',
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

//process logout request
router.get("/logout", utilities.handleErrors(accountController.accountLogout));

// Route for registration
router.get('/register', utilities.handleErrors(accountController.buildRegister));
// Process the registration data
// Process validation rules for registration
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

router.get(
  "/admin",
  utilities.checkLogin,
  utilities.checkOwnership,
  utilities.handleErrors(accountController.buildAdminPanel)
);

router.post(
  "/admin",
  utilities.checkLogin,
  utilities.checkOwnership,
  (req, res, next) => {
    console.log("Processing bulk update", req.body);
    next();
  },
  regValidate.adminUpdateRules(),
  regValidate.checkadminUpdate,
  utilities.handleErrors(accountController.processAdminBulkUpdate)
);

router.get(
  "/edit/:accountId",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildEditAccount)
);

router.post(
  "/update",
  utilities.checkLogin,
  regValidate.editAccountRules(),
  regValidate.checkAccountData,
  utilities.handleErrors(accountController.updateAccountInfo)
);

router.post(
  "/update/password",
  utilities.checkLogin,
  regValidate.accountPasswordRules(),
  regValidate.checkAccountPassword,
  utilities.handleErrors(accountController.updateAccountPassword)
);

// Middleware for errors
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something were wrong in the account.');
  });

  module.exports = router;