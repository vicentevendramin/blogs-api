const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { postController } = require('../controllers');
const {
  validateRequiredFields,
  validateCategoryId,
} = require('../middlewares/validatePost.middleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validateRequiredFields,
  validateCategoryId,
  postController.insertPost,
);

module.exports = router;