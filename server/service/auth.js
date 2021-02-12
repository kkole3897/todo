const { userModel, boardModel } = require('../models');

class Auth {
  constructor() {}

  validateId(id) {
    const pattern = /^[a-z0-9][a-z0-9\-_]{4,19}$/;
    return pattern.test(id);
  }

  validatePassword(password) {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[~`!@#$%^&*()\-_=+{}\[\]\\|:;'",<.>/?]).{8,16}$/;
    return pattern.test(password);
  }
}

module.exports = Auth;
