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
        is_active INT GENERATED ALWAYS AS (IF(deleted_at IS NULL, 1, NULL)) VIRTUAL INVISIBLE,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        UNIQUE KEY unique_board_name_by_user (name, user_id, is_active)
      );
    `;
    this.database.query(createBoardTableQuery, (err, result) => {
      // console.log(result);
    });
  }

  async addBoard({ name, userId }) {
    const addBoardQuery = `
      INSERT INTO board(name, user_id)
      VALUES (?, ?);
    `;
    const [result] = await this.database.query(addBoardQuery, [name, userId]);
    return { id: result.insertId };
  }

  async getBoardsByUser(userId) {
    const getBoardsQuery = `
      SELECT
        board.id boardId,
        name,
        COUNT(card.id) numberOfCards
      FROM board LEFT JOIN card
        ON board.id = card.board_id
      WHERE board.user_id = ? AND board.deleted_at IS NULL AND card.deleted_at IS NULL
      GROUP BY board.id;
    `;
    const [result] = await this.database.query(getBoardsQuery, [userId]);
    return result;
  }

  async getBoardById(id) {
    const getBoardQuery = `
      SELECT
        board.id boardId,
        name,
        COUNT(card.id) numberOfCards
      FROM board LEFT JOIN card
        ON board.id = card.board_id
      WHERE board.id = ? AND board.deleted_at IS NULL AND card.deleted_at IS NULL
      GROUP BY board.id;
    `;
    const [result] = await this.database.query(getBoardQuery, [id]);
    return { ...result[0] };
  }

  async updateBoard({ id, name }) {
    const updateBoardQuery = `
      UPDATE board
      SET name = ?
      WHERE id = ? AND deleted_at IS NULL;
    `;
    await this.database.query(updateBoardQuery, [name, id]);
    return { id };
  }

  async deleteBoard(id) {
    const deleteBoardQuery = `
      UPDATE board
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL;
    `;
    await this.database.query(deleteBoardQuery, [id]);
    return { id };
  }
}

module.exports = Board;
