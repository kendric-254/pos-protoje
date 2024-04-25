module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('sales', {
        sale_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity_sold: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Sale
}