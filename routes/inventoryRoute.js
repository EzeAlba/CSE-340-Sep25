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

//Get inventory for AJAX route
router.get(
    "/getInventory/:classification_id",
    utilities.checkAccountType,
    utilities.handleErrors(invController.getInventoryJSON)
)

//view edit update route page
router.get(
    "/edit/:inventoryId",
    utilities.checkLogin,
    utilities.checkAccountType,
    utilities.handleErrors(invController.buildEditInv)
)

//handle the update request
router.post("/update/",
    utilities.checkLogin, 
    utilities.checkAccountType,
    inventoryValidation.addInvRules(),
    inventoryValidation.checkUpdateData,
    utilities.handleErrors(invController.updateInventory)
)

//handle the delete request
router.get("/delete/:inventoryId",
    utilities.checkLogin, 
    utilities.checkAccountType,
    utilities.handleErrors(invController.buildDeleteInv)
)

//handle the delete post
router.post("/delete/",
    utilities.checkLogin, 
    utilities.checkAccountType,
    utilities.handleErrors(invController.deleteInventory)
)
//routes to build the Vehicle Management
router.get("/",utilities.handleErrors(invController.buildVehicleManager))
router.get("/addClass",utilities.handleErrors(invController.buildAddClass))
router.post("/addClass",
    utilities.checkLogin, 
    utilities.accountTypeCheck,
    inventoryValidation.addClassRules(),
    inventoryValidation.checkAddClassData,
    utilities.handleErrors(invController.addClass)
)


router.get("/addInv",
    utilities.checkLogin, 
    utilities.accountTypeCheck,
    utilities.handleErrors(invController.buildAddInv))

router.post("/addInv",
    utilities.checkLogin, 
    utilities.accountTypeCheck,
    inventoryValidation.addInvRules(),
    inventoryValidation.checkAddInvData,
    utilities.handleErrors(invController.addInv)
)

module.exports = router;