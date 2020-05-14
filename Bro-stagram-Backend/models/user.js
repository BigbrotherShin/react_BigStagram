module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post, { as: 'Posts', foreignKey: 'UserId' });
    db.User.hasMany(db.Comment, { as: 'Comments', foreignKey: 'UserId' });
    db.User.belongsToMany(db.Comment, {
      through: 'MentionComment',
      as: 'MentioningComments',
    });
    db.User.belongsToMany(db.Post, {
      through: 'PostBookmark',
      as: 'BookmarkPosts',
    });
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'followingId',
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'followerId',
    });
    db.User.belongsToMany(db.Comment, {
      through: 'CommentLike',
      as: 'CommentLiked',
    });
  };

  return User;
};
