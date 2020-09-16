const express = require('express');
const router = express.Router();
const login = require('./login');
const logout = require('./logout');

router.use('/', login);
router.use('/', logout);

module.exports = router;
