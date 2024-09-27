const express = require('express');
const productController = require('../controller/productController'); // Ensure this matches your renamed controller
const router = express.Router();

// Route for adding a new product
router.post('/addProduct', productController.addProduct);

// Route for retrieving all products
router.get('/getAllProducts', productController.getAllProducts);

// Route for retrieving a specific product by ID
router.get('/getProduct/:id', productController.getProduct);

// Route for updating a product by ID
router.patch('/updateProduct/:id', productController.updateProduct);

// Route for deleting a product by ID
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;
