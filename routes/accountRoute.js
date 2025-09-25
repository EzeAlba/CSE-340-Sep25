// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require ("../controllers/accountController")
const regValidate = require('../utilities/account-validation')

router.post('/register', accountController.handleRegister);
// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)

// Route for login
router.get('/login', accountController.buildLogin);


// Route for registration
router.get('/register', accountController.buildRegister);

// Middleware for errors
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something were wrong in the account.');
  });

  module.exports = router;