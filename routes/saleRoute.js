const express = require('express');
const salesController = require('../controller/salesController')
const router = express.Router();

router.post('/makeSale', salesController.makeSale)

module.exports = router;