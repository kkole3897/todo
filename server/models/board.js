class Board {
  constructor(database) {
    this.database = database;

    const createBoardTableQuery = `
      CREATE TABLE IF NOT EXISTS board(
        id INT AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        position INT NOT NULL,
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
      INSERT INTO board(name, user_id, position)
      VALUES (
        ?,
        ?,
        (SELECT IFNULL(MAX(position) + 1, 1) FROM board b WHERE user_id = ?)
      );
    `;
    const [result] = await this.database.query(addBoardQuery, [
      name,
      userId,
      userId,
    ]);
    return { id: result.insertId };
  }

  async getBoardsByUser(userId) {
    const getBoardsQuery = `
      SELECT id, name
      FROM board
      WHERE user_id = ? AND deleted_at IS NULL
      ORDER BY position ASC;
    `;
    const [result] = await this.database.query(getBoardsQuery, [userId]);
    return result;
  }

  async getBoardById(id) {
    const getBoardQuery = `
      SELECT id, name
      FROM board
      WHERE id = ? AND deleted_at IS NULL;
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

  async moveBoard({ id, previousBoardId, userId }) {
    const getPrevPosQuery = `SELECT position FROM board WHERE id = ? AND user_id = ? AND deleted_at IS NULL;`;
    const getOriginPosQuery = `SELECT position FROM board WHERE id = ? AND user_id = ? AND deleted_at IS NULL;`;
    const updateTargetPosQuery = `UPDATE board SET position = ? WHERE id = ? AND user_id = ? AND deleted_at IS NULL;`;
    const connection = await this.database.getConnection(async conn => conn);
    try {
      const [[{ position: prevPos }]] = !!!previousBoardId
        ? [[{ position: 0 }]]
        : await this.database.query(getPrevPosQuery, [previousBoardId, userId]);
      const [
        [{ position: targetPos }],
      ] = await this.database.query(getOriginPosQuery, [id, userId]);
      const newTargetPos = targetPos > prevPos ? prevPos + 1 : prevPos;
      const updateRestQuery =
        targetPos > prevPos
          ? `UPDATE board SET position = position + 1 WHERE id != ? AND user_id = ? AND position >= ? AND position < ?`
          : `UPDATE board SET position = position - 1 WHERE id != ? AND user_id = ? AND position <= ? AND position > ?`;
      await connection.beginTransaction();
      await connection.query(updateTargetPosQuery, [
        prevPos < targetPos ? prevPos + 1 : prevPos,
        id,
        userId,
      ]);
      await connection.query(updateRestQuery, [
        id,
        userId,
        newTargetPos,
        targetPos,
      ]);
      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}

module.exports = Board;
