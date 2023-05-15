const { BlogPost, PostCategory, User, Category } = require('../models');

const insertPost = async (post) => {
  const { title, content, categoryIds, userId } = post;

  const newPost = await BlogPost.create({ title, content, userId });

  const postCategories = categoryIds.map((categoryId) => ({
    postId: newPost.id,
    categoryId,
  }));

  await PostCategory.bulkCreate(postCategories);

  return { type: null, message: newPost };
};

const getPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return posts; 
};

const findPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return post;
};

const updatePost = async (id, post) => {
  const { title, content } = post;

  await BlogPost.update({ title, content }, { where: { id } });

  const getPost = await findPostById(id);

  return getPost;
};

const deletePost = async (id) => {
  const post = await findPostById(id);

  if (!post) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  return BlogPost.destroy({ where: { id } });
};

module.exports = {
  insertPost,
  getPosts,
  findPostById,
  updatePost,
  deletePost,
};