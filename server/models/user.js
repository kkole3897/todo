class User {
  constructor(database) {
    this.database = database;

    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS user(
        id varchar(20),
        password varchar(16) NOT NULL,
        PRIMARY KEY(id)
      );
    `;
    this.database.query(createUserTableQuery, (err, results) => {
      // console.log(results);
    });
  }

  async addUser({ id, password }) {
    if (!this.validateId(id) || !this.validatePassword(password)) {
      throw new Error('invalid id or password');
    }
    const addUserQuery = `
      INSERT INTO user(id, password)
      VALUES (?, ?);
    `;
    await this.database.query(addUserQuery, [id, password]);
    return { id };
  }

  async getUser({ id, password }) {
    const getUserQuery = `
        SELECT id
        FROM user
        WHERE id = ? AND password = ?;
      `;
    const [rows] = await this.database.query(getUserQuery, [id, password]);
    return { ...rows[0] };
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

module.exports = User;
