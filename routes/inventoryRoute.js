// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/index.js")
const inventoryValidation =  require('../utilities/inventory-validation.js')


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
//route to show specific details
router.get("/detail/:itemId",invController.buildDetail)

//routes to build the Vehicle Management
router.get("/",utilities.handleErrors(invController.buildVehicleManager))
router.get("/addClass",utilities.handleErrors(invController.buildAddClass))
router.post("/addClass",
    inventoryValidation.addClassRules(),
    inventoryValidation.checkAddClassData,
    utilities.handleErrors(invController.addClass)
)


router.get("/addInv",utilities.handleErrors(invController.buildAddInv))
router.post("/addInv",
    inventoryValidation.addInvRules(),
    inventoryValidation.checkAddInvData,
    utilities.handleErrors(invController.addInv)
)

module.exports = router;