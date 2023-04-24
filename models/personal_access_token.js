'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Personal_Access_Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Personal_Access_Token.init({
    user_id: DataTypes.INTEGER,
    access_token: DataTypes.STRING,
    expiredAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Personal_Access_Token',
  });
  return Personal_Access_Token;
};