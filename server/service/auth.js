require('dotenv').config();
const bcrypt = require('bcrypt');
const { userModel } = require('../models');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

class Auth {
  constructor() {}

  async signUp(user) {
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
      const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
      const result = await userModel.addUser({ ...user, password: hash });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async signIn(user) {
    try {
      const matchedUser = await userModel.getUserById(user.id);
      if (!matchedUser) {
        throw new Error('Cannot find any users who match id.');
      }
      const isPasswordMatched = await bcrypt.compare(
        user.password,
        matchedUser.password,
      );
      if (!isPasswordMatched) {
        throw new Error('Password is not matched.');
      }
      delete matchedUser.password;
      return matchedUser;
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
