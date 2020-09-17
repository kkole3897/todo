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
}).patch('/', (req, res, next) => {
    const cardId = req.body.cardId;
    const work = req.body.work;
    const listId = req.body.listId;
    const description = req.body.description;

    if (work === 'change') {
        card.updateCardDescription(cardId, description).then((results) => {
            res.send('카드 내용 수정 성공');
        }).catch((err) => {
            res.send('카드 내용 수정 실패');
        });
    } else if (work === 'move') {
        card.changeIncludedList(cardId, listId).then((results) => {
            res.send('카드 이동 성공');
        }).catch((err) => {
            res.send('카드 이동 실패');
        });
    } else if (work === 'remove') {
        card.removeCard(cardId).then((results) => {
            res.send('카드 삭제 성공');
        }).catch((err) => {
            res.send('카드 삭제 실패');
        })
    }
})

module.exports = router;