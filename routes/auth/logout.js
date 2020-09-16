const express = require('express');
const router = express.Router();

router.get('/logout', (req, res, next) => {
    if (!req.session.isLogined) {
        res.send('로그인 상태가 아닙니다.');
        return;
    }
    req.session.destroy((err) => {
        try {
            res.send('로그아웃되었습니다.');
        } catch {
            res.send('세션 접근 불가능');
        }
        
    })
});

module.exports = router;