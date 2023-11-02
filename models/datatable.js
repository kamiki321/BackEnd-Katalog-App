'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataTable.init({
    no_katalog_data: DataTypes.STRING,
    kode_satker: DataTypes.STRING,
    tahun: DataTypes.STRING,
    no_urut: DataTypes.STRING,
    satker: DataTypes.STRING,
    nama_dataset: DataTypes.STRING,
    objek_data: DataTypes.STRING,
    variabel_pembentuk: DataTypes.STRING,
    format_dokumen_data: DataTypes.STRING,
    jenis_data: DataTypes.STRING,
    status: DataTypes.STRING,
    produsen_data: DataTypes.STRING,
    jadwal_pemutakhiran: DataTypes.STRING,
    tagging_data_prioritas: DataTypes.STRING,
    prioritas_nasional: DataTypes.STRING,
    program_prioritas: DataTypes.STRING,
    kesepakatan_berbagi_data: DataTypes.STRING,
    link_api: DataTypes.STRING,
    kesepakatan_pengumpulan_data: DataTypes.INTEGER,
    catatan: DataTypes.STRING,
    dasar_hukum: DataTypes.STRING, 
    kategori: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DataTable',
    tableName: "DataTable",
    timestamps: false,
  });
  return DataTable;
};