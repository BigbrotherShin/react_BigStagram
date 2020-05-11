const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post('/image', upload.single('file'), (req, res) => {
  // multer: 폼데이터 파일 -> req.file(s) / 폼데이터 일반 값 -> req.body

  // upload.array() 이미지 여러 장 -> req.files
  // upload.single() 이미지 한 장 올릴 때 -> req.file
  // upload.none() 이미지나 파일을 안 올릴 때 -> req.body

  res.status(200).json({
    name: req.file.filename,
    status: 'done',
    url: `http://localhost:3065/${req.file.filename}`,
  });
});

// multer: 폼데이터 파일(upload.single(), upload.array()) -> req.file(s)
// 폼데이터 일반 값(upload.none()) -> req.body
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  // POST /api/post
  try {
    const hashtags = req.body.content.match(/#[^\s]+/g); // 해시태그 검색
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }),
        ),
      );
      await newPost.addHashtags(result.map((r) => r[0]));
    }

    if (Array.isArray(req.body.image)) {
      // 이미지 주소를 여러개 올리면 images: [주소1, 주소2] 이기 때문에 Array.isArray()로 배열인지 아닌지 확인
      const images = await Promise.all(
        req.body.image.map((image) =>
          db.Image.create({ src: image.response.name }),
        ),
      );
      await newPost.addImages(images);
    } else if (req.body.image) {
      // 이미지를 하나만 올리면 image: 주소
      const image = await db.Image.create({ src: req.body.image });
      await newPost.addImage(image);
    }

    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
        {
          model: db.Image,
        },
      ],
    });

    res.status(200).json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
