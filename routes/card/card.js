const express = require('express');
const router = express.Router();
const models = require('../../models');
const card = models.card;

router.get('/', (req, res, next) => {
    const userId = req.session.userId;
    card.getCardsByUserId(userId).then((results) => {
        res.send(results);
    }).catch((err) => {
        console.error(err);
        next();
    });
}).post('/', (req, res, next) => {
    const listId = req.body.listId;
    const description = req.body.description;

    card.addCard(listId, description).then((results) => {
        res.send('카드 추가 성공');
    }).catch((err) => {
        res.send('카드 추가 실패');
    });
}).put('/', (req, res, next) => {
    const cardId = req.body.cardId;
    const listId = req.body.listId;
    const description = req.body.description;
    const removed = req.body.removed;

    console.log(cardId);
    console.log(listId);
    console.log(description);
    console.log(removed);
    card.updateAllValues(cardId, listId, description, removed).then((results) => {
        res.send('업데이트 성공');
    }).catch((err) => {
        res.send('업데이트 실패');
    });
});

module.exports = router;
