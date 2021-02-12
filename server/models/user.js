require('dotenv').config();
const bcrypt = require('bcrypt');

class User {
  constructor(database) {
    this.database = database;
    this.saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS user(
        id varchar(20),
        password varchar(255) NOT NULL,
        PRIMARY KEY(id)
      );
    `;
    this.database.query(createUserTableQuery, (err, results) => {
      // console.log(results);
    });
  }

  async addUser({ id, password }) {
    const addUserQuery = `
      INSERT INTO user(id, password)
      VALUES (?, ?);
    `;
    const hash = await bcrypt.hash(password, this.saltRounds);
    await this.database.query(addUserQuery, [id, hash]);
    return { id };
  }

  async getUser({ id, password }) {
    const getUserQuery = `
        SELECT id, password
        FROM user
        WHERE id = ?;
      `;
    const [[user]] = await this.database.query(getUserQuery, [id, password]);
    if (!user) {
      throw new Error('Cannot find any users who match id');
    }
    const isPasswordRight = await bcrypt.compare(password, user.password);
    if (!isPasswordRight) {
      throw new Error('Incorrect password');
    }
    return { ...user };
  }
}

module.exports = User;
