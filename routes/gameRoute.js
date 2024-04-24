const express = require('express');
const gameController = require('../controller/gameController')
const router = express.Router();

router.post('/getGame', gameController.getGame)

module.exports = router;