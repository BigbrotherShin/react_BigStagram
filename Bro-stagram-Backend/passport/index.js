const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('serialize', user);
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
        // order: [[{ model: db.Post, as: 'Posts' }, 'createdAt', 'DESC']],
        include: [
          // {
          //   model: db.Post,
          //   as: 'Posts',
          //   include: [
          //     {
          //       model: db.Image,
          //     },
          //   ],
          // },
          {
            model: db.Post,
            as: 'BookmarkPosts',
            attributes: ['id'],
          },
          {
            model: db.User,
            as: 'Followers',
            attributes: ['id', 'nickname', 'userId'],
          },
          {
            model: db.User,
            as: 'Followings',
            attributes: ['id', 'nickname', 'userId'],
          },
        ],
        attributes: { exclude: ['password'] },
      });
      return done(null, user);
    } catch (e) {
      console.log(e);
      done(e);
    }
  });

  local();
};
