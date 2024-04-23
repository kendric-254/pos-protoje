const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/dbConfig");


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operaterAliases: false,
});

sequelize.authenticate()
    .then(() => {
     console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.log("Error" + err);
    })

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.admins = require('./adminModel')(sequelize, DataTypes);
db.users = require('./userModel')(sequelize, DataTypes);

db.sequelize.sync({force: false})
    .then(() => {
    console.log('re-sync done')
    })

    
module.exports = db