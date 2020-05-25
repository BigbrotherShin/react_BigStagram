const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const path = require('path');

const prod = process.env.NODE_ENV === 'production';

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
// const userAPIRouter = require('./routes/user');
// const postsAPIRouter = require('./routes/posts');
// const hashtagAPIRouter = require('./routes/hashtag');

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'));
app.use(
  cors({
    origin: true, // 요청 주소와 같게
    credentials: true, // cors, axios에서 둘 다 true로
  }),
);

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'wervzva',
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/user', userAPIRouter);
app.use('/api/posts', postsAPIRouter);
app.use('/api/post', postAPIRouter);

app.get('/', (req, res) => {
  res.send('BroStagram 정상 동작');
});

app.listen(prod ? process.env.PORT : 3065, () => {
  console.log(`Server is running on ${process.env.PORT || 3065}`);
});
