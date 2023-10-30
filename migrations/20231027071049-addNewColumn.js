'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('DataTable', 'jenis_data', {
      type: Sequelize.STRING,
      allowNull: true, // You can adjust the options as needed
      after: 'format_dokumen_data'
    });
  },

  async down (queryInterface, Sequelize) {
    // Remove the newly added column in the down migration
    await queryInterface.removeColumn('DataTable', 'jenis_data');
  }
};
