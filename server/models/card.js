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
      VALUES (?, ?, ?, (SELECT IFNULL(MAX(position) + 1, 1) FROM card b WHERE board_id = ?));
    `;
    const [result] = await this.database.query(addCardQuery, [
      description,
      author,
      boardId,
      boardId,
    ]);
    return { id: result.insertId };
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

  async changeBoard({ cardId, targetBoardId, originBoardId }) {
    const changeBoardQuery = `
      UPDATE card
      SET board_id = ?
      WHERE id = ? AND board_id = ? AND deleted_at IS NULL;
    `;
    const [result] = await this.database.query(changeBoardQuery, [
      targetBoardId,
      cardId,
      originBoardId,
    ]);
    if (result.affectedRows !== 1) {
      throw new Error(`Cannot find id '${cardId}' in table 'card'`);
    }
    return { id: cardId };
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
      WHERE board_id = ? AND deleted_at IS NULL;
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

  async moveCard({ id, previousCardId, boardId }) {}
}

module.exports = Card;
