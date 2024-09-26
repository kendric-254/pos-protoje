const {where} = require("sequelize")
const db = require('../model/dbConnect')
const createHttpError = require("http-errors")
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

    getGame: async (req, res, next) => { 
        try {
            let id = req.params.id
            let Game = await games.findOne({
                where: {
                    game_id: id
                }
            })
            if (!games) {
                throw (createHttpError(404, "Game not found"))
            }
            res.status(200).send(Game)
        } catch (error) { 
            next(error)
        }
    },
    getAllGames: async (req, res, next) => {
        try {
            let getAllGames = await games.findAll()
            res.status(200).send(getAllGames)
        } catch (error) {
            next(error)
        }
    }
}