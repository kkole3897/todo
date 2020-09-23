const models = require('../../models');
const list = models.list;

function getLists(req, res, next) {
    const userId = req.session.userId;
    list.getList(userId).then((results) => {
        
        res.send({status: 'ok', message: '리스트 데이터를 불러왔습니다.', data: results});
    }).catch((err) => {
        res.send({status: 'fail', message: '리스트 데이터를 불러오지 못했습니다.'});
    });
}

module.exports = {
    getLists
};
