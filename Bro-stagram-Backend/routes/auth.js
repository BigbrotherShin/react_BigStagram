const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('authAPI 작동');
});

module.exports = router;
