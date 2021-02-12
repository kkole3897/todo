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
    await this.database.query(addUserQuery, [id, password]);
    return { id };
  }

  async getUserById(id) {
    const getUserQuery = `
        SELECT id, password
        FROM user
        WHERE id = ?;
      `;
    const [[user]] = await this.database.query(getUserQuery, [id]);
    return { ...user };
  }
}

module.exports = User;
