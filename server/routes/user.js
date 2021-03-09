const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const { user } = req;
  res.status(200).json({
    success: true,
    message: 'User is authenticated.',
    data: user,
  });
});

module.exports = router;
