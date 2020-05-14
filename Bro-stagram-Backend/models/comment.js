module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );

  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User, {
      as: 'Commenter',
      foreignKey: 'UserId',
    });
    db.Comment.belongsToMany(db.User, {
      through: 'MentionComment',
      as: 'MentionedUsers',
    });
    db.Comment.belongsTo(db.Post);
    db.Comment.hasMany(db.Comment, {
      as: 'Recomments',
      foreignKey: 'RecommentId',
    });
    db.Comment.belongsToMany(db.User, {
      through: 'CommentLike',
      as: 'CommentLikers',
    });
    // db.Comment.belongsTo(db.Comment, {
    //   foreignKey: 'RecommentId',
    //   targetKey: 'id',
    //   as: 'Recommented',
    // });
  };

  return Comment;
};
