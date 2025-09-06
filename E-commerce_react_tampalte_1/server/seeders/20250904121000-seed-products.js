'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.join(__dirname, '../products.json');
    const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const seedData = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      discountPrice: product.discountPrice,
      discount: product.discount,
      image: product.image,
      category: product.Category,
      keyFeatures: JSON.stringify(product['Key Features']),
      sku: product.SKU,
      isNew: product.isNew,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('products', seedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
