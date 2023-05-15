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
  try {
    const users = await userService.findAllUsers();

    return res.status(200).json(users);
  } catch (error) {
    return error;
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.findUserById(id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });

    return res.status(200).json(user);
  } catch (error) {
    return error;
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.user;

    const { id } = await userService.findUserByEmail(email);

    await userService.deleteUser(id);

    return res.status(204).end();
  } catch (error) {
    return error;
  }
};

module.exports = {
  loginUser,
  createUser,
  findAllUsers,
  findUserById,
  deleteUser,
};