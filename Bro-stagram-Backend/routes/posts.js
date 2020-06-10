const express = require('express');
const db = require('../models');
const {
  Sequelize: { Op },
} = require('../models');
const { isLoggedIn, findUser } = require('./middlewares');
const router = express.Router();

// const { Op } = Sequelize; === const { Sequelize: { Op }} = require('../models');

router.get('/', isLoggedIn, findUser, async (req, res, next) => {
  //GET /api/posts
  try {
    const followings = await req.findUser.getFollowings();
    const posts = await db.Post.findAll({
      order: [
        ['createdAt', 'DESC'],
        [{ model: db.Comment, as: 'Comments' }, 'createdAt', 'ASC'],
        [
          { model: db.Comment, as: 'Comments' },
          { model: db.Comment, as: 'Recomments' },
          'createdAt',
          'ASC',
        ],
      ],
      where: {
        // 내 포스트를 포함해서 팔로우 한 사람 게시글만 가져오기.
        UserId: { [Op.or]: [req.user.id, followings.map((v) => v.id)] },
      },
      include: [
        {
          model: db.User,
          as: 'Writer',
          attributes: { exclede: ['password'] },
        },
        {
          model: db.User,
          as: 'Likers',
          attributes: { exclede: ['password'] },
        },
        {
          model: db.Image,
        },
        {
          model: db.Comment,
          required: false,
          as: 'Comments',
          where: { RecommentId: { [Op.is]: null } },
          include: [
            {
              model: db.User,
              as: 'Commenter',
              attributes: { exclede: ['password'] },
            },
            {
              model: db.User,
              as: 'CommentLikers',
              attributes: { exclede: ['password'] },
            },
            {
              model: db.Comment,
              as: 'Recomments',
              required: false,
              include: [
                {
                  model: db.User,
                  as: 'Commenter',
                  attributes: { exclede: ['password'] },
                },
                {
                  model: db.User,
                  as: 'CommentLikers',
                  attributes: { exclede: ['password'] },
                },
              ],
            },
          ],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/images', async (req, res, next) => {
  try {
    let followings;
    let exceptFollowingsPosts;
    if (req.user && req.user.id) {
      const me = await db.User.findOne({ where: { id: req.user.id } });
      followings = await me.getFollowings();
      const followingsId = followings.map((v) => v.id);
      exceptFollowingsPosts = {
        UserId: {
          [Op.notIn]: [...followingsId, me.id],
        },
      };
    }
    const onlyImagesPosts = await db.Post.findAll({
      order: [['createdAt', 'DESC']],
      where: exceptFollowingsPosts,
      include: [
        {
          model: db.Image,
          limit: 1,
        },
      ],
    });
    res.status(200).json({ onlyImagesPosts });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/myPosts', isLoggedIn, async (req, res, next) => {
  try {
    const myPosts = await db.Post.findAll({
      where: { UserId: req.user.id },
      include: [
        {
          model: db.Image,
          limit: 1,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(myPosts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/bookmark', findUser, async (req, res, next) => {
  try {
    const bookmarkPosts = await req.findUser.getBookmarkPosts({
      order: [[db.Sequelize.literal('PostBookmark.createdAt'), 'DESC']],
      include: [
        {
          model: db.Image,
          limits: 1,
        },
      ],
    });
    res.status(200).json(bookmarkPosts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
