const db = require('../model/dbConnect');
const sales = db.sales;
const products = db.products;

module.exports = {
    makeSale: async (req, res, next) => {
        try {
            let info = {
                quantity_sold: req.body.quantity_sold,
                total_price: req.body.total_price,
                product_id: req.body.product_id,
                sale_date: req.body.sale_date,
            };

            const product = await products.findOne({ where: { product_id: info.product_id } });
            if (!product) {
                return res.status(404).send({ message: "Product not found" });
            }

            if (info.quantity_sold > product.quantity_in_stock) {
                return res.status(400).send({ message: "Quantity sold exceeds quantity in stock" });
            }

            await products.decrement('quantity_in_stock', { by: info.quantity_sold, where: { product_id: info.product_id } });
            const makeSale = await sales.create(info);

            res.status(200).send(makeSale);
        } catch (error) {
            next(error);
        }
    },

    getAllSales: async (req, res, next) => {
        try {
            let getAllSales = await sales.findAll({
                include: [{
                    model: products,
                    attributes: ['product_name']
                }],
                order: [
                    ['sale_date', 'DESC']
                ]
            });
            res.status(200).send(getAllSales);
        } catch (error) {
            next(error);
        }
    },
}
