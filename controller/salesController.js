const {where} = require("sequelize")
const db = require('../model/dbConnect')
const sales = db.sales
const {Game}  = require('../model/gamesModel')
const games = db.games
module.exports = {
    makeSale: async (req, res, next) => {
        try {
            let info = {
                quantity_sold: req.body.quantity_sold,
                total_price: req.body.total_price,
                game_id: req.body.game_id
            }

            await games.decrement('quantity_in_stock', {by:info.quantity_sold, where: {game_id: info.game_id} })
            const makeSale = await
                sales.create(info)
            res.status(200).send(makeSale)
        } catch (error) {
            next(error)
        }
    },
    //  getAllSales: async (req, res, next) => {
    //     try {
    //         let getAllSales = await sales.findAll({
    //             include: [{model: Game, attributes:['game_name']}]
    //         })
    //         res.status(200).send(getAllSales)
    //     } catch (error) {
    //         next(error)
    //     }
    // },

    getAllSales: async (req, res, next) => {
    try {
        let getAllSales = await sales.findAll({
            include: [{ model: games, attributes: ['game_name'] }],
            raw: true, 
            nest: true
        });
        getAllSales = getAllSales.map(sale => ({
            ...sale,
            game: { game_id: sale['Game.game_id'], game_name: sale['Game.game_name'] }
        }));
        getAllSales = getAllSales.map(({ Game, ...sale }) => sale);

        res.status(200).send(getAllSales);
    } catch (error) {
        next(error);
    }
},

}