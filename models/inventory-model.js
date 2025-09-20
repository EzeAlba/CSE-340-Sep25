const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

//GET specific details from inventory Item by item_id

async function getItemById(itemId) {
  try{
    const data = await pool.query(
      `SELECT
      i.inv_id,
      i.inv_make,
      i.inv_model,
      i.inv_year,
      i.inv_price,
      i.inv_miles,
      i.inv_description,
      i.inv_image,
      i.classification_id
      FROM public.inventory AS i
      WHERE i.inv_id =$1`,[itemId]
    );
    return data.rows[0];
  }catch(error){console.error("getItemByID error", error);
    throw error;
  }
  
}

module.exports = {getClassifications, getInventoryByClassificationId, getItemById}