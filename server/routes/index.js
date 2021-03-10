const express = require('express');
const authRouter = require('./auth');
const boardRouter = require('./board');
const userRouter = require('./user');
const cardRouter = require('./card');
const { authorization } = require('./middlewares');

const router = express.Router();
router.use('/auth', authRouter);
router.use('/boards', authorization, boardRouter);
router.use('/user', authorization, userRouter);
router.use('/boards/:boardId/cards', authorization, cardRouter);

module.exports = router;
