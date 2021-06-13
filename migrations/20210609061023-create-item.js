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
      storeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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

    await queryInterface.addConstraint("items", {
      fields: ["storeId"],
      type: "foreign key",
      name: "fk_items_stores",
      references: {
        table: "stores",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};