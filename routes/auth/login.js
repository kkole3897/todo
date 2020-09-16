const express = require('express');
const router = express.Router();
const models = require('../../models');
const user = models.user;

/*
* 로그인 인증 요청이 들어오면 id를 db에서 확인하고, 있으면 로그인,
* 없으면 id를 db에 등록하고 로그인 처리
*/
router.post('/login', (req, res, next) => {
    if(req.session.isLogined) {
        res.send('이미 로그인된 상태');
        return;
    }

    const id = req.body.id;
    
    user.findUserById(id).then(result => {
        if (!result) {
            user.insertUserId(id).then((results) => {
                console.log(`${id} Insert Success`);
            }).catch((err) => {
                console.log(`${id} Insert Fail`);
                res.status(401).send('로그인 실패');
            });
        }
        req.session.userId = id;
        req.session.isLogined = true;
        res.json({user_id: id, isLogined: true});
    }).catch((err) => {
        res.status(401).send('로그인 실패');
    });
    
}).get('/login', (req, res, next) => {
    const html = `
    <h1>로그인 페이지</h1>
    <form action='login', method='post'>
        <input name='id', type='text', placeholder='아이디'>
        <button type='submit'>로그인</button>
    </form>`;
    res.send(html);
})

module.exports = router;
