const generateToken = require('../helpers/generateToken.helper');
const { loginService } = require('../services');

const loginController = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await loginService.findUser(email, password);

      if (!user) return res.status(400).json({ message: 'Invalid fields' });

      const payload = { email };
      const token = generateToken(payload);

      return res.status(200).json({ token });
    } catch (error) {
      return error;
    }
  },
};

module.exports = loginController;