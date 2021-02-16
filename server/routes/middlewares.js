function authorization(req, res, next) {
  const sid = req.sessionID;
  const sessionStore = req.sessionStore;

  sessionStore.get(sid, (error, session) => {
    if (!session) {
      res.status(401).json({
        success: false,
        message: 'Authentication is required.',
        data: {},
      });
      return;
    }
    req.user = session.user;
    next();
  });
}

module.exports = { authorization };
