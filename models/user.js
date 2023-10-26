'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const Role = require('./role');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
    */
   static associate(models) {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
     // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
    }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            this.setDataValue('password', hash);
        }
    },

}, {
    sequelize,
    modelName: 'User',
    tableName: "Users",
});

  return User;
};