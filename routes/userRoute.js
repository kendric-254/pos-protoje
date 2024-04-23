const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.post('/addUser', userController.addUser)
router.post('/loginUser', userController.loginUser)

module.exports = router;