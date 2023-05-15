module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
      primaryKey: ['postId', 'categoryId'],
    }
  );
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'postId',
      as: 'blogPosts',
      through: PostCategory,
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      as: 'categories',
      through: PostCategory,
      otherKey: 'postId',
    });
  }
  return PostCategory;
};