const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Sequelize = require('sequelize');
const db = require('../models');
const { isLoggedIn, findUser } = require('./middlewares');

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

    return res.status(200).json(newUser);
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
          attributes: ['id', 'userId', 'nickname'],
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

router.get('/:id', async (req, res, next) => {
  try {
    // console.log('/user/:id', req.params.id);
    const userInfo = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [
        {
          model: db.Post,
          as: 'Posts',
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: db.Image,
            },
          ],
        },
      ],
      attributes: ['id', 'userId', 'nickname'],
    });

    res.status(200).json(userInfo);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
