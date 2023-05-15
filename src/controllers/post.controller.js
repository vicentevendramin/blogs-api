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

const getPosts = async (_req, res) => {
  try {
    const posts = await postService.getPosts();

    return res.status(200).json(posts);
  } catch (error) {
    return error;
  }
};

const findPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postService.findPostById(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  } catch (error) {
    return error;
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await postService.updatePost(id, { title, content });
    
    return res.status(200).json(post);
  } catch (error) {
    return error;
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const { type, message } = await postService.deletePost(id);

    if (type) return res.status(404).json({ message });

    return res.status(204).json({ message: '' });
  } catch (error) {
    return error;
  }
};

module.exports = {
  insertPost,
  getPosts,
  findPostById,
  updatePost,
  deletePost,
};