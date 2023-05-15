const { postService, userService } = require('../services');

const insertPost = async (req, res) => {
  try {
    const post = req.body;

    const { dataValues: { id } } = await userService.findUserByEmail(req.user.email);

    const { type, message } = await postService.insertPost({ ...post, userId: id });

    if (type) return res.status(400).json({ message });

    return res.status(201).json(message);
  } catch (error) {
    return error;
  }
};

module.exports = {
  insertPost,
};