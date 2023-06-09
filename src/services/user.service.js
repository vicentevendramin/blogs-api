const { User } = require('../models');

const findUser = async (email, password = '') =>
    User.findOne({ where: { email, password } });

const createUser = async (displayName, email, password, image) =>
  User.create({ displayName, email, password, image });

const findAllUsers = async () => 
  User.findAll({ attributes: { exclude: ['password'] } });

const findUserById = async (id) =>
  User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

const findUserByEmail = async (email) =>
  User.findOne({ where: { email } });

const deleteUser = async (id) =>
  User.destroy({ where: { id } });

module.exports = {
  findUser,
  createUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
  deleteUser,
};