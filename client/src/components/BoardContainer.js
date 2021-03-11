import boardStore from '../store/boardStore';

import './BoardContainer.css';
import AddBoardModal from './AddBoardModal';
import Board from './Board';

class BoardContainer {
  constructor() {
    this.element = document.createElement('div');

    this.boards = boardStore.getState().boards;

    this.clickAddBoardButtonHandler = this.clickAddBoardButtonHandler.bind(
      this,
    );
    boardStore.subscribe(this.createNewBoard, this);
  }

  render() {
    this.element.className = 'board-container';

    this.boards.forEach(board => {
      this.element.appendChild(new Board(board).render());
    });

    const button = `<button class='board-container__add-button'>Add Board</button>`;
    this.element.insertAdjacentHTML('beforeend', button);

    this.element.addEventListener('click', this.clickAddBoardButtonHandler);

    return this.element;
  }

  clickAddBoardButtonHandler(event) {
    if (!event.target.closest('.board-container__add-button')) {
      return;
    }
    event.preventDefault();
    const boardContainer = document.querySelector('.board-container');
    const addBoardModal = new AddBoardModal();
    boardContainer.appendChild(addBoardModal.render());
  }

  createNewBoard() {
    const { boards } = boardStore.getState();
    if (boards.length <= this.boards.length) {
      return;
    }
    this.boards = boards;
    const target = this.element.querySelector('.board-container__add-button');
    const board = this.boards[this.boards.length - 1];
    target.insertAdjacentElement('beforebegin', new Board(board).render());
  }
}

export default BoardContainer;
