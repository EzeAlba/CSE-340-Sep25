const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  console.log(data)
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


//Build inventory dropdown
Util.buildClassificationDropdown = async function (classification_id) {
  let selectedOption = classification_id;
  let data = await invModel.getClassifications();
  console.log("buildClassificationDropdown data", data);
  let classDropOptions = "";
  data.rows.forEach((row) => {
    if (row.classification_id == selectedOption) {
      classDropOptions += `<option value="${row.classification_id}" selected>${row.classification_name}</option>`;
    } else {
      classDropOptions += `<option value="${row.classification_id}">${row.classification_name}</option>`;
    }
  });
  console.log("classDrop", classDropOptions);
  return classDropOptions;
};


/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  // console.log("Checking login");
  try {
    const decoded = jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (res.locals.loggedin && req.cookies.jwt && decoded) {
      console.log("Token passed");
      console.log("Checking decoded Token:", decoded);
      res.locals.user = decoded;
      next();
    } else {
      Util.accountFail(req, res, next);
    }
  } catch (error) {
    Util.accountFail(req, res, next);
  }
};

/* **************************************
* Formatting the item detail view HTML
* ************************************ */
Util.formatItem = async function(item){
  const formattedPrice = Number(item.inv_price).toLocaleString('en-US', {style: 'currency', currency: 'USD'})
  const formattedMileage = Number(item.inv_miles).toLocaleString()

  const itemHTML = `
  <div class = "detail">
    <img src ="${item.inv_image}" alt = "${item.inv_make} ${item.inv_model}" class="image" />
    <div class = "item-content">
      <h2>${item.inv_make} ${item.inv_model}</h2>
      <p>Make and Model:${item.inv_make} ${item.inv_model}</p>
      <p>Year: ${item.inv_year}</p>
      <p>Price: ${formattedPrice}</p>
      <p>Mileage: ${formattedMileage}</p>
      <p>Description: ${item.inv_description}</p>
    </div>
  </div>
    `
  return itemHTML
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)





module.exports = Util