'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aplikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Aplikasi.init({
    imageUrl: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    jenis_aplikasi: DataTypes.STRING,
    pemilik_aplikasi: DataTypes.STRING,
    pengguna_aplikasi: DataTypes.STRING,
    buttonUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aplikasi',
    tableName: "Aplikasi",
    timestamps: false,
  });
  return Aplikasi;
};