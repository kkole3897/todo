const express = require('express');
const router = express.Router();
const card = require('./card');

router.use('/', card);

module.exports = router;