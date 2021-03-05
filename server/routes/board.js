const express = require('express');
const BoardService = require('../service/board');

const router = express.Router();
const boardService = new BoardService();

router.get('/', async (req, res) => {
  const { user } = req;
  const result = await boardService.readBoards(user.id);
  res
    .status(200)
    .json({ success: true, message: 'Successfully get boards.', data: result });
});

router.get('/:boardId', async (req, res) => {
  const { boardId } = req.params;
  const result = await boardService.readBoard(boardId);
  res.status(200).json({
    success: true,
    message: 'Successfully get board.',
    data: result,
  });
});

router.post('/', async (req, res) => {
  const { user } = req;
  const { name } = req.body;
  const result = await boardService.createBoard({ userId: user.id, name });
  res.status(201).json({
    success: true,
    message: 'Successfully create board.',
    data: result,
  });
});

router.put('/:boardId', async (req, res) => {
  const { boardId } = req.params;
  const { name } = req.body;
  const result = await boardService.updateBoard({ id: boardId, name });
  res.status(201).json({
    success: true,
    message: 'Successfully update board.',
    data: result,
  });
});

router.delete('/:boardId', async (req, res) => {
  const { boardId } = req.params;
  const result = await boardService.deleteBoard(boardId);
  res.status(200).json({
    success: true,
    message: 'Successfully delete board.',
    data: result,
  });
});

module.exports = router;