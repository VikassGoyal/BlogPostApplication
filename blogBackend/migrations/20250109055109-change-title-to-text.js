'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('posts', 'title', {
      type: Sequelize.TEXT,
      allowNull: false, // Keep the NOT NULL constraint if it exists
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn('posts', 'title', {
      type: Sequelize.STRING(255), // Revert back to VARCHAR(255) in the down migration
      allowNull: false,
    });
  }
};
