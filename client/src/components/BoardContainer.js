import './BoardContainer.css';

import boardStore from '../store/boardStore';
import AddBoardModal from './AddBoardModal';
import Board from './Board';

class BoardContainer {
  constructor() {
    this.element = document.createElement('div');

    this.boards = boardStore.getState().boards;

    this.clickAddBoardButtonHandler = this.clickAddBoardButtonHandler.bind(
      this,
    );
    this.dropHandler = this.dropHandler.bind(this);

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
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);

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

  dragOverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (!event.target.closest('.board')) {
      return;
    }
    const target = event.target.closest('.board');
    const { nextSibling } = target;
    const { draggedBoard } = boardStore.getState();
    if (nextSibling === draggedBoard) {
      target.insertAdjacentElement('beforebegin', draggedBoard);
    } else {
      target.insertAdjacentElement('afterend', draggedBoard);
    }
  }

  dropHandler(event) {
    event.preventDefault();
  }
}

export default BoardContainer;
