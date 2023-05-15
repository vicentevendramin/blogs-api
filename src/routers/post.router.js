const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { postController } = require('../controllers');
const {
  validateRequiredFields,
  validateCategoryId,
  validatePostOwner,
  validateFieldsToUpdate,
} = require('../middlewares/validatePost.middleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validateRequiredFields,
  validateCategoryId,
  postController.insertPost,
);

router.get(
  '/search',
  authMiddleware,
  postController.getPostsByQuery,
);

router.get(
  '/:id',
  authMiddleware,
  postController.findPostById,
);

router.get(
  '/',
  authMiddleware,
  postController.getPosts,
);

router.put(
  '/:id',
  authMiddleware,
  validatePostOwner,
  validateFieldsToUpdate,
  postController.updatePost,
);

router.delete(
  '/:id',
  authMiddleware,
  validatePostOwner,
  postController.deletePost,
);

module.exports = router;