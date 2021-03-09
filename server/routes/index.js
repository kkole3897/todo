const express = require('express');
const authRouter = require('./auth');
const boardRouter = require('./board');
const userRouter = require('./user');
const { authorization } = require('./middlewares');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/boards', authorization, boardRouter);
router.use('/user', authorization, userRouter);

module.exports = router;
