const express = require('express');
const { userController } = require('../controllers');
const { validateLogin } = require('../middlewares/validateLogin.middleware');

const router = express.Router();

router.post(
  '/',
  validateLogin,
  userController.loginUser,
);

module.exports = router;