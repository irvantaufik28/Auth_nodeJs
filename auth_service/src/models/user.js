'use strict';
const { v4: uuidv4 } = require("uuid")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    msisdn: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User', 
    tableName: "Users",
    underscored: true
  }
  );
  User.addHook("beforeCreate", async (user, options) => {
    user.id = uuidv4();
  });
  return User;
};