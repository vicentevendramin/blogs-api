const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: '"name" is required' });

    const newCategory = await categoryService.createCategory(name);

    return res.status(201).json(newCategory);
  } catch (error) {
    return error;
  }
};

const findAllCategories = async (_req, res) => {
  try {
    const categories = await categoryService.findAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    return error;
  }
};

module.exports = {
  createCategory,
  findAllCategories,
};