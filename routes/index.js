const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
