const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

exports.upload = multer({
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

// 프로필 사진 업로드 유틸
const multerStorage = multer.memoryStorage();

exports.uploadProfileImage = multer({
  storage: multerStorage,
});

// const uploadFile = uploadProfileMulter.single('profileImage');

// exports.uploadProfileImage = (req, res, next) => {
//   uploadFile((req, res, next) => {
//     next();
//   });
// };
