const { User } = require('../models');

const loginService = {
  findUser: async (email, password = '') =>
    User.findOne({ where: { email, password } }),
};

module.exports = loginService;