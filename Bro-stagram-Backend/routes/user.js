const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Sequelize = require('sequelize');
const db = require('../models');
const {
  isLoggedIn,
  findUser,
  followUser,
  resizeProfile,
} = require('./middlewares');
const { uploadProfileImage } = require('../util/multer');

const router = express.Router();

const Op = Sequelize.Op;

router.get('/', isLoggedIn, (req, res) => {
  return res.status(200).json(req.user); // passport.deserializeUser를 통한 req.user 데이터
});

router.post('/', async (req, res, next) => {
  // /api/user post
  try {
    const exUser = await db.User.findOne({
      where: {
        [Op.or]: [{ userId: req.body.userId }, { nickname: req.body.nickname }],
      },
    });

    if (exUser) {
      const key = exUser.userId === req.body.userId ? '아이디' : '닉네임';

      return res.status(403).send(`이미 사용중인 ${key} 입니다.`);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      userId: req.body.userId,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    const filteredUser = Object.assign({}, newUser.toJSON());
    // user 객체는 sequelize 객체이기 때문에 순수한 JSON으로 만들기 위해 user.toJSON()
    // user.toJSON() 하지 않으면 에러 발생
    // toJSON()을 붙여주는 이유는 서버로부터 전달받은 데이터를 변형하기 때문임.
    delete filteredUser.password; // 서버로부터 전달받은 데이터를 변형하지 않는다면
    delete filteredUser.createdAt;
    delete filteredUser.updatedAt;

    req.login(newUser, (loginError) => {
      if (loginError) {
        console.error(loginError);
      }
    });

    res.status(200).json(filteredUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  // Post /api/user/login
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // 서버에 에러가 있는 경우
      console.error(err);
      next(err);
    }
    if (info) {
      // 로직에 에러가 있는 경우: 없는 아이디 이거나 비밀번호가 틀린 경우
      console.log(info);
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: {
            id: user.id,
          },
          attributes: { exclude: ['password'] },
        });

        return res.status(200).json(fullUser);
      } catch (e) {
        console.error(e);
        next(e);
      }
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  // /api/user/logout
  req.logout();
  req.session.destroy();
  res.status(200).send('로그아웃 성공');
});

router.get('/:userData', async (req, res, next) => {
  try {
    console.log('/user/:userData', req.params);
    const isUserId = parseInt(req.params.userData, 10)
      ? parseInt(req.params.userData, 10)
      : null;
    const userInfo = await db.User.findOne({
      where: {
        [Op.or]: [
          { id: isUserId },
          { nickname: decodeURIComponent(req.params.userData) },
        ],
      },
      order: [[{ model: db.Post, as: 'Posts' }, 'createdAt', 'DESC']],
      include: [
        {
          model: db.Post,
          as: 'Posts',
          required: false,
          include: [
            {
              model: db.Image,
            },
          ],
        },
        {
          model: db.User,
          as: 'Followers',
          attributes: { exclude: ['password'] },
        },
        {
          model: db.User,
          as: 'Followings',
          attributes: { exclude: ['password'] },
        },
      ],
      attributes: { exclude: ['password'] },
    });

    res.status(200).json(userInfo);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/following', isLoggedIn, followUser, async (req, res, next) => {
  try {
    await req.followUser.addFollower(req.user.id);
    res.status(200).json(req.followUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/following', isLoggedIn, followUser, async (req, res, next) => {
  try {
    await req.followUser.removeFollower(req.user.id);
    res.status(200).json(req.followUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/me/follow', isLoggedIn, findUser, async (req, res, next) => {
  try {
    const followings = await req.findUser.getFollowings();
    const followers = await req.findUser.getFollowers();
    const data = { followings, followers };
    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch(
  '/profileImage',
  isLoggedIn,
  findUser,
  uploadProfileImage.single('profileImage'),
  resizeProfile,
  async (req, res, next) => {
    try {
      await db.User.update(
        {
          profileImage: req.body.profileImage,
        },
        { where: { id: req.user.id } },
      );
      res.status(200).json({
        imagePath: req.body.profileImage,
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  },
);

router.delete('/profileImage', isLoggedIn, findUser, async (req, res, next) => {
  try {
    await db.User.update(
      {
        profileImage: null,
      },
      { where: { id: req.user.id } },
    );
    res.status(200).send('프로필 사진이 삭제되었습니다.');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
