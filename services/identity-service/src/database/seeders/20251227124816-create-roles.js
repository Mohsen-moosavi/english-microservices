'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      { name: 'MANAGER', created_at: new Date(), updated_at: new Date() },
      { name: 'ADMIN', created_at: new Date(), updated_at: new Date() },
      { name: 'USER', created_at: new Date(), updated_at: new Date() },
      { name: 'TEACHER', created_at: new Date(), updated_at: new Date() },
      { name: 'WRITTER', created_at: new Date(), updated_at: new Date() },
      { name: 'TEACHERWRITTER', created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
