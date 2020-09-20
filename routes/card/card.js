const models = require('../../models');
const card = models.card;

function getCards(req, res, next) {
    const userId = req.session.userId;
    card.getCardsByUserId(userId).then((results) => {
        
        res.send({status: 'ok', message: '카드 데이터를 불러왔습니다.', data: results});
    }).catch((err) => {
        res.send({status: 'fail', message: '카드 데이터를 불러오지 못했습니다.'});
    });
}

function addCard(req, res, next) {
    const listId = req.body.listId;
    const description = req.body.description;
    card.addCard(listId, description).then((results) => {
        res.send({status: 'ok', message: '카드를 추가했습니다.'});
    }).catch((err) => {
        res.send({status: 'fail', message: '카드를 추가하지 못했습니다.'});
    });
}

function updateCard(req, res, next) {
    const cardId = req.body.cardId;
    const listId = req.body.listId;
    const description = req.body.description;
    const removed = req.body.removed;

    card.updateAllValues(cardId, listId, description, removed).then((results) => {
        res.send({status: 'ok', message: '카드를 업데이트했습니다.'});
    }).catch((err) => {
        res.send({status: 'fail', message: '카드를 업데이트하지 못했습니다.'});
    });
}

module.exports = {
    getCards,
    addCard,
    updateCard
};
