const express = require('express');
const router = express.Router();
const card = require('./card');

router.get('/', card.getCards);
router.post('/', card.addCard);
router.put('/', card.updateCard);

module.exports = router;
