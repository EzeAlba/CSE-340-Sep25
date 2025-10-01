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



// Middleware for errors
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something were wrong in the account.');
  });

  module.exports = router;