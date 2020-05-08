const express = require('express');
const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
  //GET /api/posts
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
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

module.exports = router;
