'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Airports', [
      {
        name: 'Indira Gandhi International Airport',
        code: 'DEL',
        address: 'New Delhi, India',
        cityID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Safdarjung Airport',
        code: 'DEL2',
        address: 'Delhi, India',
        cityID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chhatrapati Shivaji Maharaj International Airport',
        code: 'BOM',
        address: 'Mumbai, Maharashtra',
        cityID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Juhu Aerodrome',
        code: 'BOM2',
        address: 'Juhu, Mumbai',
        cityID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Kempegowda International Airport',
        code: 'BLR',
        address: 'Bangalore, Karnataka',
        cityID: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'HAL Airport',
        code: 'BLR2',
        address: 'Old Airport Road, Bangalore',
        cityID: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rajiv Gandhi International Airport',
        code: 'HYD',
        address: 'Shamshabad, Hyderabad',
        cityID: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Begumpet Airport',
        code: 'HYD2',
        address: 'Begumpet, Hyderabad',
        cityID: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Delhi Airbase Terminal',
        code: 'DEL3',
        address: 'Palam, Delhi',
        cityID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mumbai Naval Airport',
        code: 'BOM3',
        address: 'Colaba, Mumbai',
        cityID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bangalore Domestic Terminal',
        code: 'BLR3',
        address: 'Bangalore South',
        cityID: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hyderabad Cargo Terminal',
        code: 'HYD3',
        address: 'Hyderabad East',
        cityID: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airports', null, {});
  }
};
