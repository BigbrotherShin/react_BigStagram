module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글 + 이모티콘
    },
  );

  Post.associate = (db) => {
    db.Post.belongsTo(db.User, { as: 'Writer', foreignKey: 'UserId' });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.User, {
      through: 'PostBookmark',
      as: 'BookmarkUsers',
      foreignKey: 'PostId',
    });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  };

  return Post;
};
