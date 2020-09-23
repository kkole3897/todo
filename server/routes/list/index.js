const express = require('express');
const router = express.Router();
const list = require('./list');

router.get('/', list.getLists);

module.exports = router;
