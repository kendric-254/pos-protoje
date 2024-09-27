const express = require('express');
const salesController = require('../controller/salesController'); 
const router = express.Router();

// Route for making a new sale
router.post('/makeSale', salesController.makeSale);

// Route for retrieving all sales
router.get('/getAllSales', salesController.getAllSales);

module.exports = router;
