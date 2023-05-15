module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    }
  );
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'id',
      as: 'blogPosts',
      through: PostCategory,
      otherKey: 'category_id',
    });

    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'id',
      as: 'categories',
      through: PostCategory,
      otherKey: 'post_id',
    });
  }
  return PostCategory;
};