'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Aplikasi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      jenis_aplikasi: {
        type: Sequelize.STRING
      },
      pemilik_aplikasi: {
        type: Sequelize.STRING
      },
      pengguna_aplikasi: {
        type: Sequelize.STRING
      },
      buttonUrl: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Aplikasi');
  }
};