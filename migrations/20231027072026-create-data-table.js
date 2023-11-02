'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DataTable', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      no_katalog_data: {
        type: Sequelize.STRING
      },
      kode_satker: {
        type: Sequelize.STRING
      },
      tahun: {
        type: Sequelize.STRING
      },
      no_urut: {
        type: Sequelize.STRING
      },
      satker: {
        type: Sequelize.STRING
      },
      nama_dataset: {
        type: Sequelize.STRING
      },
      objek_data: {
        type: Sequelize.STRING
      },
      variabel_pembentuk: {
        type: Sequelize.STRING
      },
      format_dokumen_data: {
        type: Sequelize.STRING
      },
      jenis_data: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      produsen_data: {
        type: Sequelize.STRING
      },
      jadwal_pemutakhiran: {
        type: Sequelize.STRING
      },
      tagging_data_prioritas: {
        type: Sequelize.STRING
      },
      prioritas_nasional: {
        type: Sequelize.STRING
      },
      program_prioritas: {
        type: Sequelize.STRING
      },
      kesepakatan_berbagi_data: {
        type: Sequelize.STRING
      },
      link_api: {
        type: Sequelize.STRING
      },
      kesepakatan_pengumpulan_data: {
        type: Sequelize.INTEGER
      },
      catatan: {
        type: Sequelize.STRING
      },
      dasar_hukum: {
        type: Sequelize.STRING
      },
      kategori: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DataTable');
  }
};