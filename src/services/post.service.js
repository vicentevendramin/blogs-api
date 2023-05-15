const { BlogPost, PostCategory } = require('../models');

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

module.exports = {
  insertPost,
};