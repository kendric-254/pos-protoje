const {where} = require("sequelize")
const db = require('../model/dbConnect')
const stocks = db.stocks


module.exports = {
    getGame: async (req, res, next) => {
        try {
            let info = {
                game_name: req.body.game_name,
                quantity_in_stock: req.body.quantity_in_stock,
                price: req.body.price
            }

            const getGame = await
                stocks.create(info)
            res.status(200).send(getGame)
        } catch (error) {
            next(error)
        }
    },
}