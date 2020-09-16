const express = require('express');
const router = express.Router();
const models = require('../../models');
const User = models.User;

router.post('/login', (req, res, next) => {
    const id = req.body.id;
    
    User.findUserById(id).then(result => {
        if (!result) {
            res.send('로그인 실패');
        }
        else {
            req.session.userId = id;
            req.session.isLogined = true;
            res.redirect('/');
        }
    }).catch((err) => {
        // db 요청 실패 처리
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
