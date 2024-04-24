const {where} = require("sequelize")
const db = require('../model/dbConnect')
const sales = db.sales


module.exports = {
    makeSale: async (req, res, next) => {
        try {
            let info = {
                quantity_sold: req.body.quantity_sold,
                total_price: req.body.total_price,
            }

            const makeSale = await
                sales.create(info)
            res.status(200).send(makeSale)
        } catch (error) {
            next(error)
        }
    },
}