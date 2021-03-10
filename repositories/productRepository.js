// Dependencies

// require the database connection
const { sql, dbConnPoolPromise } = require('../database/db.js');

// models
const Product = require('../models/product.js');

// Define SQL statements here for use in function below
// These are parameterised queries note @named parameters.
// Input parameters are parsed and set before queries are executed

// Get all products from the products table
// for json path - Tell MS SQL to return results as JSON (avoiding the need to convert here)
const SQL_SELECT_ALL = 'SELECT * FROM dbo.product ORDER BY product_name ASC for json path;';

// Get a single product matching a id, @id
// for json path, without_array_wrapper - use for single json result
const SQL_SELECT_BY_ID = 'SELECT * FROM dbo.product WHERE _id = @id for json path, without_array_wrapper;';

// Get all products from a category (by its id @id)
// for json path, without_array_wrapper - use for single json result
const SQL_SELECT_BY_CATID = 'SELECT * FROM dbo.product WHERE category_id = @id ORDER BY product_name ASC for json path;';


// Get all products
// This is an async function named getProducts defined using ES6 => syntax
let getProducts = async () => {

    // define variable to store products
    let products;

    // Get a DB connection and execute SQL (uses imported database module)
    // Note await in try/catch block
    try {
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // execute query
            .query(SQL_SELECT_ALL);
        
        // first element of the recordset contains products
        products = result.recordset[0];

    // Catch and log errors to cserver side console 
    } catch (err) {
        console.log('DB Error - get all products: ', err.message);
    }

    // return products
    return products;
};

// get product by id
// This is an async function named getProductById defined using ES6 => syntax
let getProductById = async (productId) => {

    let product;

    // returns a single product with matching id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set @id parameter in the query
            .input('id', sql.Int, productId)
            // execute query
            .query(SQL_SELECT_BY_ID);

        // Send response with JSON result    
        product = result.recordset[0];

        } catch (err) {
            console.log('DB Error - get product by id: ', err.message);
        }
        
        // return the product
        return product;
};

// Get products by category
let getProductsByCatId = async (categoryId) => {

    let products;

    // returns products with matching category id
    try {
        // Get a DB connection and execute SQL
        const pool = await dbConnPoolPromise
        const result = await pool.request()
            // set named parameter(s) in query
            .input('id', sql.Int, categoryId)
            // execute query
            .query(SQL_SELECT_BY_CATID);

        // Send response with JSON result    
        products = result.recordset[0];

        } catch (err) {
            console.log('DB Error - get product by category id: ', err.message);
        }

    return products;
};


// Export 
module.exports = {
    getProducts,
    getProductById,
    getProductsByCatId,
};
