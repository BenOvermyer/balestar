'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class System extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  System.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    mechanics: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'System',
  });
  return System;
};