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
    if (!this.validateDescription(description)) {
      throw new Error('invalid description');
    }
    const addCardQuery = `
      INSERT INTO card(description, author, board_id)
      VALUES (?, ?, ?);
    `;
    const [result] = await this.database.query(addCardQuery, [
      description,
      author,
      boardId,
    ]);
    return { id: result.insertId };
  }

  async updateDescription({ description, cardId }) {
    if (!this.validateDescription(description)) {
      throw new Error('invalid description');
    }
    const updateDescriptionQuery = `
      UPDATE card
      SET description = ?
      WHERE id = ? AND deleted_at IS NULL;
    `;
    const [result] = await this.database.query(updateDescriptionQuery, [
      description,
      cardId,
    ]);
    if (result.affectedRows !== 1) {
      throw new Error(`Cannot find id '${cardId}' in table 'card'`);
    }
    return { id: cardId };
  }

  async removeCard(cardId) {
    const removeCardQuery = `
      UPDATE card
      SET deleted_at = CURRENT_TIMESTAMP
      WHERE id = ? AND deleted_at IS NULL;
    `;
    const [result] = await this.database.query(removeCardQuery, [cardId]);
    if (result.affectedRows !== 1) {
      throw new Error(`Cannot find id '${cardId}' in table 'card'`);
    }
    return { id: cardId };
  }

  async changeBoard({ cardId, targetBoardId }) {
    const changeBoardQuery = `
      UPDATE card
      SET board_id = ?
      WHERE id = ? AND deleted_at IS NULL;
    `;
    const [result] = await this.database.query(changeBoardQuery, [
      targetBoardId,
      cardId,
    ]);
    if (result.affectedRows !== 1) {
      throw new Error(`Cannot find id '${cardId}' in table 'card'`);
    }
    return { id: cardId };
  }

  async getCard(cardId) {
    const getCardQuery = `
      SELECT id, description, author, board_id boardId
      FROM card
      WHERE id = ? AND deleted_at IS NULL;
    `;
    const [rows] = await this.database.query(getCardQuery, [cardId]);
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

  validateDescription(description) {
    return 0 < description.length && description.length <= 500;
  }
}

module.exports = Card;
