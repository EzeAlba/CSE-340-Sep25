const express = require("express")
const router = express.Router()
const ratingController = require("../controllers/ratingController")
const utilities = require("../utilities/index.js")

console.log("in rating Route")
router.post("/submit",
    utilities.checkLogin,
    utilities.handleErrors(ratingController.submitRating))

module.exports = router