class Board {
  constructor(database) {
    this.database = database;

    const createBoardTableQuery = `
      CREATE TABLE IF NOT EXISTS board(
        id INT AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME,
        user_id VARCHAR(20) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        UNIQUE KEY unique_board_name_by_user (name, user_id)
      );
    `;
    this.database.query(createBoardTableQuery, (err, result) => {
      // console.log(result);
    });
  }

  async addBoard({ name, userId }) {
    if (!this.validateName(name)) {
      throw new Error('invalid name');
    }
    const addBoardQuery = `
      INSERT INTO board(name, user_id)
      VALUES (?, ?);
    `;
    const [result] = await this.database.query(addBoardQuery, [name, userId]);
    return { id: result.insertId };
  }

  validateName(name) {
    return 0 < name.length && name.length <= 50;
  }
}

module.exports = Board;
