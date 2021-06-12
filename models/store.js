'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.store.hasOne(models.user, { 
        foreignKey: store_id, 
        onDelete: 'CASCADE' 
      })

      // models.store.hasMany(models.item, { 
      //   foreignKey: store_id, 
      //   sourceKey: id, 
      //   onDelete: 'CASCADE' 
      // })
      // models.item.belongsTo(models.store, { 
      //   foreignKey: store_id, 
      //   targetKey: id 
      // })
    }
  };
  store.init({
    phone: DataTypes.STRING,
    storename: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'store',
  });
  return store;
};