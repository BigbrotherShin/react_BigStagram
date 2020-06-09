const db = require('../models');
const path = require('path');
const sharp = require('sharp');

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
      include: [
        {
          model: db.Post,
          as: 'BookmarkPosts',
          attributes: ['id'],
        },
        {
          model: db.User,
          as: 'Followings',
          attributes: ['id', 'userId', 'nickname'],
        },
        {
          model: db.User,
          as: 'Followers',
          attributes: ['id', 'userId', 'nickname'],
        },
      ],
      attributes: ['id', 'userId', 'nickname'],
    });

    if (!findUser) {
      res.status(403).send('해당 사용자를 찾을 수 없습니다.');
    }
    req.findUser = findUser; // router에서 req.findUser를 사용할 수 있음.
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    if (req.user.id === parseInt(req.body.userId, 10)) {
      return res.status(403).send('자기 자신을 팔로우할 수 없습니다.');
    }
    const followUser = await db.User.findOne({
      where: { id: parseInt(req.body.userId, 10) },
      attributes: ['id', 'userId', 'nickname'],
    });
    if (!followUser) {
      return res.status(403).send('해당 사용자를 찾을 수 없습니다.');
    }
    req.followUser = followUser;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};

exports.findPost = async (req, res, next) => {
  try {
    // let isDetail;
    // console.log(req);
    // if (req.body.data === 'getDetail') {
    //   isDetail = {
    //     include: [
    //       {
    //         model: db.User,
    //         as: 'Writer',
    //         attributes: { exclude: ['password'] },
    //       },
    //       {
    //         model: db.User,
    //         as: 'Likers',
    //         attributes: { exclude: ['password'] },
    //       },
    //       {
    //         model: db.User,
    //         as: 'Commenter',
    //         attributes: { exclude: ['password'] },
    //       },
    //       {
    //         model: db.User,
    //         as: 'CommentLikers',
    //         attributes: { exclude: ['password'] },
    //       },
    //       {
    //         model: db.Comment,
    //         as: 'Recomments',
    //         include: [
    //           {
    //             model: db.User,
    //             as: 'Commenter',
    //             attributes: { exclude: ['password'] },
    //           },
    //           {
    //             model: db.User,
    //             as: 'CommentLikers',
    //             attributes: { exclude: ['password'] },
    //           },
    //         ],
    //       },
    //     ],
    //   };
    // }
    const findPost = await db.Post.findOne({
      where: {
        id: parseInt(req.params.postId || req.body.postId, 10),
      },
    });
    if (!findPost) {
      res.status(403).send('해당 포스트를 찾지 못했습니다.');
    }
    req.findPost = findPost;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// 프로필 사진 리사이즈
exports.resizeProfile = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const file = req.file;
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const newFilename =
      basename + new Date().valueOf() + 'profileThumbnail' + ext;
    await sharp(file.buffer).resize(150).toFile(`uploads/${newFilename}`);

    req.body.profileImage = newFilename;

    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// 이미지 리사이즈
exports.resizeImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const file = req.file;
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);

    const metadata = await sharp(file.buffer).metadata();

    let newFilename;
    if (metadata.width > 540) {
      newFilename = basename + new Date().valueOf() + 'resized' + ext;
      await sharp(file.buffer).resize(540).toFile(`uploads/${newFilename}`);
    } else {
      newFilename = basename + new Date().valueOf() + ext;
      await sharp(file.buffer).toFile(`uploads/${newFilename}`);
    }

    req.file.filename = newFilename;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};
