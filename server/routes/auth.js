const express = require('express');
const AuthService = require('../service/auth');

const router = express.Router();
const authService = new AuthService();

router.post('/signup', async (req, res) => {
  const user = { ...req.body };

  try {
    const result = await authService.signUp(user);

    res.status(201).json({
      success: true,
      message: 'User signed up successfully.',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
      data: {},
    });
  }
});

router.post('/signin', async (req, res) => {
  const user = { ...req.body };
  const session = req.session;

  try {
    const result = await authService.signIn(user);
    session.user = { ...result };
    res.status(201).json({
      success: true,
      message: 'User signed in succesfully.',
      data: {
        user: { ...result },
        sid: req.sessionID,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: err.message,
      data: {},
    });
  }
});

module.exports = router;
