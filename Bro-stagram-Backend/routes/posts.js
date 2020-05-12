const express = require('express');
const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
  //GET /api/posts
  try {
    const posts = await db.Post.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          attributes: ['id', 'UserId', 'nickname'],
        },
        {
          model: db.Image,
        },
      ],
    });

    res.status(200).json(posts);
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
