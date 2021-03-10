const express = require('express');
const CardService = require('../service/card');

const router = express.Router({ mergeParams: true });
const cardService = new CardService();

router.get('/', async (req, res) => {
  const { boardId } = req.params;
  try {
    const cards = await cardService.readCards(boardId);
    res.status(200).json({
      success: true,
      message: `Successfully get cards in board id:${boardId}.`,
      data: { cards },
    });
  } catch {
    res.status(404).json({
      success: false,
      message: 'Cannot find cards.',
      data: {},
    });
  }
});

router.get('/:cardId', async (req, res) => {
  const { boardId, cardId } = req.params;
  try {
    const card = await cardService.readCard({ boardId, cardId });
    res.status(200).json({
      success: true,
      message: `Successfully get card id:${cardId} in board id:${boardId}.`,
      data: { card },
    });
  } catch {
    res.status(404).json({
      success: false,
      message: 'Cannot find card.',
      data: {},
    });
  }
});

router.post('/', async (req, res) => {
  const { boardId } = req.params;
  const { user } = req;
  const { description } = req.body;
  try {
    const id = await cardService.createCard({
      description,
      author: user.id,
      boardId,
    });
    res.status(201).json({
      success: true,
      message: 'Successfully create card.',
      data: {
        ...id,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      data: {},
    });
  }
});

router.patch('/:cardId/description', async (req, res) => {
  const { cardId, boardId } = req.params;
  const { description } = req.body;
  try {
    const id = await cardService.updateDescription({
      cardId,
      description,
      boardId,
    });
    res.status(200).json({
      success: true,
      message: 'Successfully update card description.',
      data: {
        ...id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
      data: {},
    });
  }
});

router.patch('/:cardId/board', async (req, res) => {
  const { targetBoardId } = req.body;
  const { cardId, boardId } = req.params;
  try {
    const id = await cardService.changeBoard({
      cardId,
      targetBoardId,
      originBoardId: boardId,
    });
    res.status(200).json({
      success: true,
      message: 'Successfully move card.',
      data: { ...id },
    });
  } catch {
    res.status(400).json({
      success: false,
      message: 'Incorrect card id or target board.',
      data: {},
    });
  }
});

router.delete('/:cardId', async (req, res) => {
  const { cardId, boardId } = req.params;
  try {
    const id = await cardService.removeCard({ cardId, boardId });
    res.status(200).json({
      success: true,
      message: 'Successfully delete card.',
      data: { ...id },
    });
  } catch {
    res.status(400).json({
      success: false,
      message: 'Fail to delete card.',
      data: {},
    });
  }
});

module.exports = router;
