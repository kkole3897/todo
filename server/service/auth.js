const { userModel } = require('../models');

class Auth {
  constructor() {}

  async signup(user) {
    try {
      if (!this.validateId(user.id)) {
        throw new Error(
          'Id must be a combination of 5 to 20 lower case, number, _ or -.',
        );
      } else if (!this.validatePassword(user.password)) {
        throw new Error(
          'Password must be between 8 and 16 characters including alphabets, numbers and special characters.',
        );
      }
      const result = await userModel.addUser(user);
      return result;
    } catch (err) {
      throw err;
    }
  }

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
