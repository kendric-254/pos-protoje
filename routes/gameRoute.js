const express = require('express');
const gameController = require('../controller/gameController')
const router = express.Router();

router.post('/addGame', gameController.addGame)
router.get('/getAllGames', gameController.getAllGames)
router.get('/getGame/:id', gameController.getGame)
module.exports = router;