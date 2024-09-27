const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig");
const { Product } = require("../model/productModel");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
    }
);

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.admins = require('./adminModel')(sequelize, DataTypes);
db.users = require('./userModel')(sequelize, DataTypes);
db.sales = require('./salesModel')(sequelize, DataTypes);
db.products = require('./productModel')(sequelize, DataTypes);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('re-sync done');
    });

db.sales.belongsTo(db.products, { foreignKey: 'game_id' });

module.exports = db;
