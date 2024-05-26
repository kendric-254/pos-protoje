'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('sales_tbs', 'game_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'games',
        key: 'game_id', 
        after: 'sale_id' 
      },
      onUpdate: 'CASCADE', 
      onDelete: 'CASCADE', 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('sales_tbs', 'game_id');
  },
};
