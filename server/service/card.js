const { cardModel } = require('../models');

class Card {
  async createCard({ description, author, boardId }) {
    try {
      if (!this.validateDescription(description)) {
        throw new Error(
          'Description of card must be between 1 to 500 characters.',
        );
      }
      const result = cardModel.addCard({ description, author, boardId });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async readCards(boardId) {
    try {
      const cards = cardModel.getCards(boardId);
      return cards;
    } catch (err) {
      throw err;
    }
  }

  async readCard({ boardId, cardId }) {
    try {
      const card = cardModel.getCard({ boardId, cardId });
      return card;
    } catch (err) {
      throw err;
    }
  }

  async updateDescription({ cardId, description }) {
    try {
      if (!this.validateDescription(description)) {
        throw new Error(
          'Description of card must be between 1 to 500 characters.',
        );
      }
      const result = cardModel.updateDescription({ cardId, description });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async removeCard(cardId) {
    try {
      const result = cardModel.removeCard(cardId);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async changeBoard({ cardId, targetBoardId }) {
    try {
      const result = cardModel.changeBoard({ cardId, targetBoardId });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async validateDescription(description) {
    return 0 < description.length && description <= 500;
  }
}

module.exports = Card;
