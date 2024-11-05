'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {     
    
    // npx sequelize-cli db:seed:all
    const result = await queryInterface.bulkInsert("users", [{
      email: 'abc@mail.com',
      password: 'test1234',
      name: 'a_admin',
      address: 'seoul',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      email: 'bfc@mail.com',
      password: 'test5678',
      name: 'b_admin',
      address: 'busan',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
    console.log(result);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
