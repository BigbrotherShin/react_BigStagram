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
    db.Comment.belongsTo(db.User);
    db.Comment.belongsToMany(db.User, {
      through: 'MentionComment',
      as: 'MentionedUser',
    });
    db.Comment.belongsTo(db.Post);
    // db.Comment.hasMany(db.User, {
    //   foreignKey: 'mentionComment',
    //   sourceKey: 'id',
    //   as: 'MentionedUser',
    // });
    db.Comment.hasMany(db.Comment, {
      foreignKey: 'recommentId',
      sourceKey: 'id',
      as: 'Recommenting',
    });
    db.Comment.belongsTo(db.Comment, {
      foreignKey: 'recommentId',
      targetKey: 'id',
      as: 'Recommented',
    });
  };

  return Comment;
};
