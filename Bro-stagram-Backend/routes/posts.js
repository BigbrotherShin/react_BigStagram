const express = require('express');
const db = require('../models');
const {
  Sequelize: { Op },
} = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

// const { Op } = Sequelize; === const { Sequelize: { Op }} = require('../models');

router.get('/', async (req, res, next) => {
  //GET /api/posts
  try {
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
      include: [
        {
          model: db.User,
          as: 'Writer',
          attributes: ['id', 'userId', 'nickname'],
        },
        {
          model: db.User,
          as: 'Likers',
          attributes: ['id', 'userId', 'nickname'],
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
              attributes: ['id', 'userId', 'nickname'],
            },
            {
              model: db.User,
              as: 'CommentLikers',
              attributes: ['id', 'userId', 'nickname'],
            },
            {
              model: db.Comment,
              as: 'Recomments',
              required: false,
              include: [
                {
                  model: db.User,
                  as: 'Commenter',
                  attributes: ['id', 'userId', 'nickname'],
                },
                {
                  model: db.User,
                  as: 'CommentLikers',
                  attributes: ['id', 'userId', 'nickname'],
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
    const onlyImagesPosts = await db.Post.findAll({
      order: [['createdAt', 'DESC']],
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

module.exports = router;
