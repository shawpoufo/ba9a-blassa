'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const d = new Date()
    await queryInterface.bulkInsert(
      'user',
      [
        {
          firstName: 'root',
          lastName: 'root',
          email: 'root@email.com',
          password:
            '$2b$10$ypLDVD7wuo6evtTULBHMKucfpf5vmJS3nyF0XKDvcNN9vuyWALBM.',
          role: 'admin',
          valide: true,
          createdAt: d,
          updatedAt: d,
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', null, {})
  },
}
