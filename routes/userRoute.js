const express = require('express');
const userController = require('../controller/userController'); 
const router = express.Router();

// Route for adding a new user
router.post('/addUser', userController.addUser);

// Route for user login
router.post('/loginUser', userController.loginUser);

// Route for resetting user password
router.post('/resetPassword', userController.resetPassword);

// Route for handling forgotten password
router.post('/forgotPassword', userController.forgotPassword);

module.exports = router;
