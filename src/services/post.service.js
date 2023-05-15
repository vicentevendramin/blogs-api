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

const getPosts = async (id = null) => {
  const condition = id && { id };

  const posts = await BlogPost.findAll({
    where: condition,
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

module.exports = {
  insertPost,
  getPosts,
};