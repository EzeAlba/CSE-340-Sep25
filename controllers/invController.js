const invModel = require("../models/inventory-model")
const Util = require("../utilities/")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build dynamic by items detail view
 * ************************** */

invCont.buildDetail = async (req,res,next) => {
  const itemId = req.params.itemId; //Getting ID.
  try{
    const item = await invModel.getItemById(itemId); // function from invModel
    const itemHTML = await utilities.formatItem(item); // formatting details
    const nav = await utilities.getNav();

    res.render("inventory/itemDetail", {
      title: `${item.inv_make} ${item.inv_model}`,
      nav,
      itemHTML,
      item
    });
  }catch(error){
    next(error);
  }
}

module.exports = invCont