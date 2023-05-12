const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { categoryController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  categoryController.createCategory,
);

router.get(
  '/',
  authMiddleware,
  categoryController.findAllCategories,
);

module.exports = router;