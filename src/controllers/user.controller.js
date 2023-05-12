const generateToken = require('../helpers/generateToken.helper');
const { userService } = require('../services');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUser(email, password);

    if (!user) return res.status(400).json({ message: 'Invalid fields' });

    const payload = { email };
    const token = generateToken(payload);

    return res.status(200).json({ token });
  } catch (error) {
    return error;
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await userService.findUser(email, password);

    if (user) return res.status(409).json({ message: 'User already registered' });

    await userService.createUser(displayName, email, password, image);

    const removeUserPassword = { ...user, password: undefined };
    const token = generateToken(removeUserPassword);

    return res.status(201).json({ token });
  } catch (error) {
    return error;
  }
};

const findAllUsers = async (_req, res) => {
  const users = await userService.findAllUsers();

  return res.status(200).json(users);
};

module.exports = {
  loginUser,
  createUser,
  findAllUsers,
};