const { Category } = require('../models');

const createCategory = async (name) =>
  Category.create({ name });

const findAllCategories = async () =>
  Category.findAll();

module.exports = {
  createCategory,
  findAllCategories,
};