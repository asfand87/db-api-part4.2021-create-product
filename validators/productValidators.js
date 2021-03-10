// Input validation package
// https://www.npmjs.com/package/validator
const validator = require('validator');

// models
const Product = require('../models/product.js');

// Validate the body data, sent by the client, for a new product
// formProduct represents the data filled in a form
// It needs to be validated before using in gthe application
let validateNewProduct = (formProduct) => {
    // Declare constants and variables
    let validatedProduct;

    // debug to console - if no data
    if (formProduct === null) {
        console.log("validateNewProduct(): Parameter is null");
    }

    // Validate form data for new product fields
    // Creating a product does not need a product id
    // Adding '' to the numeric values makes them strings for validation purposes ()
    if (
        validator.isNumeric(formProduct.CategoryId + '', {no_symbols: true, allow_negatives: false}) && 
        !validator.isEmpty(formProduct.ProductName) && 
        !validator.isEmpty(formProduct.ProductDescription) && 
        validator.isNumeric(formProduct.ProductStock + '', { no_symbols: true, allow_negatives: false }) && 
        validator.isCurrency(formProduct.ProductPrice + '', { no_symbols: true, allow_negatives: false }))
    {
        // Validation passed
        // create a new Product instance based on Product model object
        // no value for product id (passed as null)
        validatedProduct = new Product(
                null,
                formProduct.CategoryId,

                // escape is to sanitize - it removes/ encodes any html tags
                validator.escape(formProduct.ProductName),
                validator.escape(formProduct.ProductDescription),
                formProduct.ProductStock,
                formProduct.ProductPrice
            );
    } else {
        // debug
        console.log("validateNewProduct(): Validation failed");
    }
    // return new validated product object
    return validatedProduct;
}

// Module exports
// expose these functions
module.exports = {
    validateNewProduct
}
