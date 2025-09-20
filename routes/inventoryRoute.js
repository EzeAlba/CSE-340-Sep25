// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
//route to show specific details
router.get("/detail/:itemId",invController.buildDetail)

module.exports = router;