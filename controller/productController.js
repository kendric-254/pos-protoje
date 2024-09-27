const { where } = require("sequelize");
const db = require('../model/dbConnect');
const createHttpError = require("http-errors");
const products = db.games; // Update this to reflect the actual model name if changed
const path = require('path');
const fs = require('fs');

module.exports = {
    addProduct: async (req, res, next) => {
        try {
            const { product_name, quantity_in_stock, price, image } = req.body;

            const newProduct = await products.create({
                product_name,
                quantity_in_stock,
                price,
                image
            });

            res.status(200).send(newProduct);
        } catch (error) {
            next(error);
        }
    },

    getProduct: async (req, res, next) => { 
        try {
            const id = req.params.id;
            const product = await products.findOne({
                where: { product_id: id } // Update `game_id` to `product_id` if applicable
            });
            if (!product) {
                throw createHttpError(404, "Product not found");
            }
            res.status(200).send(product);
        } catch (error) { 
            next(error);
        }
    },

    getAllProducts: async (req, res, next) => {
        try {
            const allProducts = await products.findAll();
            res.status(200).send(allProducts);
        } catch (error) {
            next(error);
        }
    }, 

    updateProduct: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updatedProduct = await products.update(req.body, { where: { product_id: id } });
            if (updatedProduct[0] === 0) {
                throw createHttpError(404, "Product not found");
            }
            res.status(200).send({ message: "Product updated successfully" });
        } catch (error) {
            next(error);
        }
    },
      
    deleteProduct: async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedProduct = await products.destroy({ where: { product_id: id } });
            if (deletedProduct === 0) {
                throw createHttpError(404, "Product not found");
            }
            res.status(200).send({ message: "Product deleted successfully" });
        } catch (error) { 
            next(error);
        }
    }
};
