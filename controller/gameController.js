const {where} = require("sequelize")
const db = require('../model/dbConnect')
const games = db.games


module.exports = {
    addGame: async (req, res, next) => {
        try {
            let info = {
                game_name: req.body.game_name,
                quantity_in_stock: req.body.quantity_in_stock,
                price: req.body.price
            }

            const addGame = await
                games.create(info)
            res.status(200).send(addGame)
        } catch (error) {
            next(error)
        }
    },
}