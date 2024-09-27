const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Route for adding a new admin
router.post('/addAdmin', adminController.addAdmin);

// Route for admin login
router.post('/loginAdmin', adminController.loginAdmin);

module.exports = router;
