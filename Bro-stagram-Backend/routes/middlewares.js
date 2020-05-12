const db = require('../models');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인이 필요합니다.');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
  }
};

exports.findUser = async (req, res, next) => {
  try {
    const findUser = await db.User.findOne({
      where: {
        id: parseInt(req.params.id || (req.user && req.user.id)),
      },
      attributes: ['id', 'userId', 'nickname'],
    });

    if (!findUser) {
      return res.status(403).send('해당 사용자를 찾을 수 없습니다.');
    }
    req.findUser = findUser; // router에서 req.findUser를 사용할 수 있음.
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};

exports.findPost = async (req, res, next) => {
  try {
    const findPost = await db.Post.findOne({
      where: {
        id: parseInt(req.body.postId, 10),
      },
    });
    if (!findPost) {
      return res.status(403).send('해당 포스트를 찾지 못했습니다.');
    }
    req.findPost = findPost;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};
