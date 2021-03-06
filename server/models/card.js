class Card {
  constructor(database) {
    this.database = database;

    const createCardTableQuery = `
      CREATE TABLE IF NOT EXISTS card(
        id INT AUTO_INCREMENT,
        description VARCHAR(500) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME,
        author VARCHAR(20) NOT NULL,
        position INT NOT NULL,
        board_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (board_id) REFERENCES board(id),
        FOREIGN KEY (author) REFERENCES user(id)
      );
    `;
    this.database.query(createCardTableQuery, (err, result) => {
      // console.log(result);
    });
  }

  async addCard({ description, author, boardId }) {
    const addCardQuery = `
      INSERT INTO card(description, author, board_id, position)
      VALUES (?, ?, ?, 1);
    `;
    const increasePositionQuery = `
      UPDATE card
      SET position = position + 1
      WHERE board_id = ? AND deleted_at IS NULL;
    `;
    const connection = await this.database.getConnection(async conn => conn);
    try {
      await connection.beginTransaction();
      await connection.query(increasePositionQuery, [boardId]);
      const [result] = await connection.query(addCardQuery, [
        description,
        author,
        boardId,
        boardId,
      ]);
      await connection.commit();
      return { id: result.insertId };
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async updateDescription({ description, cardId, boardId }) {
    const updateDescriptionQuery = `
      UPDATE card
      SET description = ?
      WHERE id = ? AND board_id = ? AND deleted_at IS NULL;
    `;
    const [result] = await this.database.query(updateDescriptionQuery, [
      description,
      cardId,
      boardId,
    ]);
    if (result.affectedRows !== 1) {
      throw new Error(`Cannot find id '${cardId}' in table 'card'`);
    }
    return { id: cardId };
  }

  async removeCard({ cardId, boardId }) {
    const removeCardQuery = `
      UPDATE card
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND board_id = ? AND deleted_at IS NULL;
    `;
    const [result] = await this.database.query(removeCardQuery, [
      cardId,
      boardId,
    ]);
    if (result.affectedRows !== 1) {
      throw new Error(`Cannot find id '${cardId}' in table 'card'`);
    }
    return { id: cardId };
  }

  async changeBoard({ cardId, targetBoardId, originBoardId, previousCardId }) {
    const getPositionQuery = `SELECT position FROM card WHERE id = ? AND board_id = ? AND deleted_at IS NULL;`;
    const updateTargetPosQuery =
      'UPDATE card SET position = ?, board_id = ? WHERE id = ? AND deleted_at IS NULL;';
    const updateCardsInOriginBoard = `UPDATE card SET position = position - 1 WHERE id != ? AND board_id = ? AND position > ? AND deleted_at IS NULL;`;
    const updateCardsInTargetBoard = `UPDATE card SET position = position + 1 WHERE id != ? AND board_id = ? AND position >= ? AND deleted_at IS NULL;`;

    const connection = await this.database.getConnection(async conn => conn);
    try {
      const [
        [{ position: targetPos }],
      ] = await this.database.query(getPositionQuery, [cardId, originBoardId]);
      const [[{ position: prevPos }]] = !!!previousCardId
        ? [[{ position: 0 }]]
        : await this.database.query(getPositionQuery, [
            previousCardId,
            targetBoardId,
          ]);
      const newTargetPos = prevPos + 1;
      await connection.beginTransaction();
      await connection.query(updateTargetPosQuery, [
        newTargetPos,
        targetBoardId,
        cardId,
      ]);
      await connection.query(updateCardsInOriginBoard, [
        cardId,
        originBoardId,
        targetPos,
      ]);
      await connection.query(updateCardsInTargetBoard, [
        cardId,
        targetBoardId,
        newTargetPos,
      ]);
      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async getCard({ boardId, cardId }) {
    const getCardQuery = `
      SELECT id, description, author, board_id boardId
      FROM card
      WHERE id = ? AND board_id = ? AND deleted_at IS NULL;
    `;
    const [rows] = await this.database.query(getCardQuery, [cardId, boardId]);
    return { ...rows[0] };
  }

  async getCards(boardId) {
    const getCardsQuery = `
      SELECT id, description, author, board_id boardId
      FROM card
      WHERE board_id = ? AND deleted_at IS NULL
      ORDER BY position ASC;
    `;
    const [rows] = await this.database.query(getCardsQuery, [boardId]);
    return rows.map(row => {
      return { ...row };
    });
  }

  async removeCardsInBoard(boardId) {
    const removeCardsInBoardQuery = `
      UPDATE card
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE board_id = ? AND deleted_at IS NULL;
    `;
    try {
      await this.database.query(removeCardsInBoardQuery, [boardId]);
    } catch (err) {
      throw err;
    }
  }

  async moveCard({ id, previousCardId, boardId }) {
    const getPositionQuery = `SELECT position FROM card WHERE id = ? AND board_id = ? AND deleted_at IS NULL;`;
    const updateTargetPosQuery = `UPDATE card SET position = ? WHERE id = ? AND board_id = ? AND deleted_at IS NULL;`;
    const connection = await this.database.getConnection(async conn => conn);
    try {
      const [
        [{ position: targetPos }],
      ] = await this.database.query(getPositionQuery, [id, boardId]);
      const [[{ position: prevPos }]] = !!!previousCardId
        ? [[{ position: 0 }]]
        : await this.database.query(getPositionQuery, [
            previousCardId,
            boardId,
          ]);
      const newTargetPos = targetPos > prevPos ? prevPos + 1 : prevPos;
      const updateRestQuery =
        targetPos > prevPos
          ? `UPDATE card SET position = position + 1 WHERE id != ? AND board_id = ? AND position >= ? AND position < ?;`
          : `UPDATE card SET position = position - 1 WHERE id != ? AND board_id = ? AND position <= ? AND position > ?;`;
      await connection.beginTransaction();
      await connection.query(updateTargetPosQuery, [newTargetPos, id, boardId]);
      await connection.query(updateRestQuery, [
        id,
        boardId,
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

module.exports = Card;
