const { User } = require('../models');

const findUser = async (email, password = '') =>
    User.findOne({ where: { email, password } });

const createUser = async (displayName, email, password, image) =>
  User.create({ displayName, email, password, image });

module.exports = {
  findUser,
  createUser,
};