const express = require('express');
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares/auth.middleware');
const {
  validateName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validateUser.middleware');

const router = express.Router();

router.delete(
  '/me',
  authMiddleware,
  userController.deleteUser,
);

router.post(
  '/',
  validateName,
  validateEmail,
  validatePassword,
  userController.createUser,
);

router.get(
  '/:id',
  authMiddleware,
  userController.findUserById,
);

router.get(
  '/',
  authMiddleware,
  userController.findAllUsers,
);

module.exports = router;