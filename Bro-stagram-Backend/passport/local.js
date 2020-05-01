const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'userId', // 프론트에서 req.body에 넣어주는 정보
        passwordField: 'password',
      },
      async (userId, password, done) => {
        try {
          const user = await db.User.findOne({
            where: { userId },
          });
          if (!user) {
            return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
          }
          const result = await bcrypt.compare(password, user.password);
          if (!result) {
            return done(null, false, { reason: '비밀번호가 틀립니다.' });
          }
          return done(null, user);
        } catch (e) {
          console.error(e);
          return done(e);
        }
      },
    ),
  );
};
