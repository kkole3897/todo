import boardStore from '../store/boardStore';

import './BoardContainer.css';
import AddBoardModal from './AddBoardModal';
import Board from './Board';

class BoardContainer {
  constructor() {
    this.clickAddBoardButtonHandler = this.clickAddBoardButtonHandler.bind(
      this,
    );
    boardStore.subscribe(this.createNewBoard, this);
  }

  render() {
    const element = document.createElement('div');
    element.className = 'board-container';

    const { boards } = boardStore.getState();

    boards.forEach(board => {
      element.appendChild(new Board(board).render());
    });

    const button = `<button class='board-container__add-button'>Add Board</button>`;
    element.insertAdjacentHTML('beforeend', button);

    element.addEventListener('click', this.clickAddBoardButtonHandler);

    return element;
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
    const target = document.querySelector('.board-container__add-button');
    const { boards } = boardStore.getState();
    const board = boards[boards.length - 1];
    target.insertAdjacentElement('beforebegin', new Board(board).render());
  }
}

export default BoardContainer;
