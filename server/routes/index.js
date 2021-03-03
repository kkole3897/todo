const express = require('express');
const authRouter = require('./auth');
const boardRouter = require('./board');
const { authorization } = require('./middlewares');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/boards', authorization, boardRouter);

module.exports = router;
