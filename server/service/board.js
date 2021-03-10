const { boardModel, cardModel } = require('../models');

class Board {
  async readBoards(userId) {
    try {
      const boards = await boardModel.getBoardsByUser(userId);
      return boards.map(board => {
        return { ...board };
      });
    } catch (err) {
      throw err;
    }
  }

  async readBoard(id) {
    try {
      const board = await boardModel.getBoardById(id);
      return board ? { ...board } : null;
    } catch (err) {
      throw err;
    }
  }

  async createBoard({ userId, name }) {
    try {
      if (!this.validateBoardName(name)) {
        throw new Error('Name of board must be between 1 to 50 characters.');
      }
      const result = await boardModel.addBoard({ userId, name });
      return { ...result };
    } catch (err) {
      throw err;
    }
  }

  async updateBoard({ id, name }) {
    try {
      if (!this.validateBoardName(name)) {
        throw new Error('Name of board must be between 1 to 50 characters.');
      }
      const result = await boardModel.updateBoard({ id, name });
      return { ...result };
    } catch (err) {
      throw err;
    }
  }

  async deleteBoard(id) {
    try {
      const result = await boardModel.deleteBoard(id);
      await cardModel.removeCardsInBoard(id);

      return { ...result };
    } catch (err) {
      throw err;
    }
  }

  validateBoardName(name) {
    return 0 < name.length && name.length <= 50;
  }
}

module.exports = Board;
