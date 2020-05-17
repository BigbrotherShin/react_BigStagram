const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const product = process.env.NODE_ENV === 'production';

dotenv.config();

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );

  server.get('/user/:id', (req, res) => {
    // 내 인스타 포스트들
    return app.render(req, res, '/user', { id: req.params.id });
  });

  server.get('*', (req, res) => {
    // 모든 get 요청 처리
    return handle(req, res);
  });

  server.listen(product ? process.env.PORT : 3060, () => {
    console.log(`next+express running on port ${process.env.PORT || 3060}`);
  });
});
