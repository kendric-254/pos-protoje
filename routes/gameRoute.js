const express = require('express');
const gameController = require('../controller/gameController')
const router = express.Router();

router.post('/addGame', gameController.addGame)
router.get('/getAllGames', gameController.getAllGames)
module.exports = router;