'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('sales', {
            sale_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            product_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'products',
                    key: 'product_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            quantity_sold: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            total_price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            sale_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('sales');
    }
};
