// Dependencies
// Input validation package
// https://www.npmjs.com/package/validator
const validator = require('validator');

// require the database connection
const productRepository = require('../repositories/productRepository.js');

// Get all products via the repository
// return products
let getProducts = async () => {
    const products = await productRepository.getProducts();
    return products;
};

// Get product by id
// Validate input
// return product
let getProductById = async (productId) => {
    // Validate input using validator module
    // important as a bad input could crash the server or lead to an attack
    // appending + '' to numbers as the validator only works with strings
    if (!validator.isNumeric(productId + '', { no_symbols: true, allow_negatives: false })) {
        console.log("getProducts service error: invalid id parameter");
        return "invalid parameter";
    }
    // get product (if validation passed)
    const product = productRepository.getProductById(productId);
    return product;
};

// Get products for a particular category (by cat id)
// Validate input
// return products
let getProductsByCatId = async(categoryId) => {
    // Validate input - important as a bad input could crash the server or lead to an attack
    // appending + '' to numbers as the validator only works with strings
    if (!validator.isNumeric(categoryId + '', { no_symbols: true, allow_negatives: false })) {
        console.log("getProductsByCatId service error: invalid id parameter");
        return "invalid parameter";
    }
    // get products (if validation passed)
    const products = productRepository.getProductsByCatId(categoryId);
    return products;
};

// Insert a new product
// This function accepts product data as a paramter from the controller.
let createProduct = async (product) => {
    // declare variables
    let newlyInsertedProduct;
    // Call the product validator - kept seperate to avoid clutter here
    let validatedProduct = productValidator.validateNewProduct(product);

    // If validation returned a product object - save to database
    if (validatedProduct != null) {
        newlyInsertedProduct = await productRepository.createProduct(validatedProduct);
    } else {
        // Product data failed validation 
        newlyInsertedProduct = {"error": "invalid product"};
        // log the result
        console.log("productService.createProduct(): form data validate failed");
    }
    // return the newly inserted product
    return newlyInsertedProduct;
}

// product update service
let updateProduct = async (product) => {

}

let deleteProduct = async (productId) => {

}

// Module exports
// expose these functions
module.exports = {
    getProducts,
    getProductById,
    getProductsByCatId,
    createProduct,
    updateProduct,
    deleteProduct
};