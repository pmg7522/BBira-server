'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      itemname: {
        type: Sequelize.STRING
      },
      itemphoto: {
        type: Sequelize.STRING
      },
      itemdesc: {
        type: Sequelize.STRING
      },
      itemprice: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })    
    .then(function( ) { 
      queryInterface.addColumn('items','store_id',{
          type: Sequelize.INTEGER,
          references:{model: 'stores', key: 'id'},
      });
    });;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};