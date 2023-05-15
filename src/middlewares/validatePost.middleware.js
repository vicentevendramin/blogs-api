const { categoryService, postService, userService } = require('../services');

const validateRequiredFields = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;

  const getAllCategories = await categoryService
      .findAllCategories({ attributes: { exclude: ['name'] } });

  const allCategoriesIds = getAllCategories.map((category) => category.dataValues.id);
  
  const equalIds = categoryIds.every((categoryId) => allCategoriesIds.includes(categoryId));
  
  if (!equalIds) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  
  next();
};

const validatePostOwner = async (req, res, next) => {
  const { id } = req.params;
  const post = await postService.findPostById(id);

  const { id: userId } = await userService.findUserByEmail(req.user.email);

  if (post && post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

const validateFieldsToUpdate = async (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  next();
};

module.exports = {
  validateRequiredFields,
  validateCategoryId,
  validatePostOwner,
  validateFieldsToUpdate,
};