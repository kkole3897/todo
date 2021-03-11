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
  try {
    const result = await boardService.createBoard({ userId: user.id, name });
    res.status(201).json({
      success: true,
      message: 'Successfully create board.',
      data: result,
    });
    return;
  } catch {
    res.status(400).json({
      success: false,
      message: 'Duplicated board name.',
      data: {},
    });
  }
});

router.put('/:boardId', async (req, res) => {
  const { boardId } = req.params;
  const { name } = req.body;
  try {
    const result = await boardService.updateBoard({ id: boardId, name });
    res.status(201).json({
      success: true,
      message: 'Successfully update board.',
      data: result,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: 'Duplicated board name.',
      data: {},
    });
  }
});

router.delete('/:boardId', async (req, res) => {
  const { boardId } = req.params;
  try {
    const result = await boardService.deleteBoard(boardId);
    res.status(200).json({
      success: true,
      message: 'Successfully delete board.',
      data: result,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: 'Cannot delete board properly',
      data: {},
    });
  }
});

module.exports = router;
