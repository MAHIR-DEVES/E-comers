'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../category.json');
    const categories = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const seedData = categories.map(category => ({
      id: category.id,
      name: category.name,
      image: category.image,
      products: category.products,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('categories', seedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
