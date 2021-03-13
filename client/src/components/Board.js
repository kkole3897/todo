import './Board.css';

import PlusIcon from '../assets/plus.svg';
import MoreIcon from '../assets/more.svg';

import { createAction } from '../lib/todox';
import cardStore from '../store/cardStore';
import boardStore from '../store/boardStore';
import AddCardForm from './AddCardForm';
import Card from './Card';
import BoardDropdown from './BoardDropdown';
import EditBoardModal from './EditBoardModal';

class Board {
  constructor({ id, name }) {
    this.element = document.createElement('div');

    this.id = id;
    this.name = name;
    this.isAddCardFormOpened = false;
    this.cards = cardStore
      .getState()
      .cards.filter(card => card.boardId === this.id);

    this.clickOpenCardFormButtonHandler = this.clickOpenCardFormButtonHandler.bind(
      this,
    );
    this.setAddCardFormOpened = this.setAddCardFormOpened.bind(this);
    this.clickMorebuttonHandler = this.clickMorebuttonHandler.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);

    cardStore.subscribe(this.createNewCard, this);
    cardStore.subscribe(this.deleteCard, this);
    boardStore.subscribe(this.updateName, this);
  }

  render() {
    this.element.className = 'board board--mr';
    this.element.dataset.boardId = this.id;
    this.element.setAttribute('draggable', true);
    this.element.innerHTML = `
      <div class='board__inner'>
        <div class='board__header'>
          <div class='flex'>
            <div class='board__card-count'>${this.cards.length}</div>
            <div class='board__title board__title--ml'>${this.name}</div>
          </div>
          <div class='flex'>
            <div class='board__open-card-form-button board__open-card-form-button--mr'>
              <img src=${PlusIcon} />
            </div>
            <div class='board__more-button'>
              <img src=${MoreIcon} />
            </div>
          </div>
        </div>
        <div class='board__body'></div>
      </div>
    `;
    const boardBody = this.element.querySelector('.board__body');
    const fragment = document.createDocumentFragment();
    this.cards.forEach(card => {
      fragment.appendChild(new Card(card).render());
    });
    boardBody.appendChild(fragment);

    this.element.addEventListener('click', this.clickOpenCardFormButtonHandler);
    this.element.addEventListener('click', this.clickMorebuttonHandler);
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);

    return this.element;
  }

  clickOpenCardFormButtonHandler(event) {
    if (!event.target.closest('.board__open-card-form-button')) {
      return;
    }
    event.preventDefault();
    const board = event.target.closest('.board');
    const boardBody = board.querySelector('.board__body');
    if (!this.isAddCardFormOpened) {
      const addCardForm = new AddCardForm({
        boardId: this.id,
        setOpened: this.setAddCardFormOpened,
      });
      boardBody.prepend(addCardForm.render());
      this.setAddCardFormOpened(true);
    } else {
      boardBody.removeChild(boardBody.firstChild);
      this.setAddCardFormOpened(false);
    }
  }

  clickMorebuttonHandler(event) {
    if (!event.target.closest('.board__more-button')) {
      return;
    }
    event.preventDefault();
    const moreButton = this.element.querySelector('.board__more-button');
    moreButton.appendChild(
      new BoardDropdown({
        openEditor: this.openEditModal,
        onDelete: this.deleteBoard,
      }).render(),
    );
  }

  setAddCardFormOpened(value) {
    this.isAddCardFormOpened = value;
  }

  createNewCard() {
    const cards = cardStore
      .getState()
      .cards.filter(card => card.boardId === this.id);
    if (cards.length <= this.cards.length) {
      return;
    }

    this.cards = cards;

    const cardCount = this.element.querySelector('.board__card-count');
    cardCount.innerHTML = this.cards.length;
    const boardBody = this.element.querySelector('.board__body');
    boardBody.insertAdjacentElement(
      'afterbegin',
      new Card(this.cards[0]).render(),
    );
  }

  deleteCard() {
    const cards = cardStore
      .getState()
      .cards.filter(card => card.boardId === this.id);
    if (cards.length >= this.cards.length) {
      return;
    }

    this.cards = cards;

    const cardCount = this.element.querySelector('.board__card-count');
    cardCount.innerHTML = this.cards.length;
  }

  openEditModal() {
    this.element.appendChild(
      new EditBoardModal({
        text: this.name,
        boardId: this.id,
      }).render(),
    );
  }

  updateName() {
    const board = boardStore
      .getState()
      .boards.filter(board => board.id === this.id)[0];
    if (this.name === board.name) {
      return;
    }
    this.name = board.name;
    const nameElement = this.element.querySelector('.board__title');
    nameElement.innerHTML = this.name;
  }

  async deleteBoard() {
    const uri = `/api/boards/${this.id}`;
    try {
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }
      boardStore.unsubscribe(this.updateName, this);
      boardStore.dispatch(createAction('ACTION_DELETE_BOARD', { id: this.id }));
      this.element.remove();
    } catch {
      alert('보드를 삭제하지 못했습니다.');
    }
  }

  dragStartHandler() {
    this.element.style.opacity = 0.5;
    boardStore.dispatch(
      createAction('ACTION_GRAB_DRAGGED_BOARD', { draggedBoard: this.element }),
    );
  }

  async dragEndHandler() {
    this.element.style.opacity = '';
    boardStore.dispatch(createAction('ACTION_DROP_DRAGGED_BOARD'));
    const { previousSibling } = this.element;
    const previousBoardId = !!previousSibling
      ? previousSibling.dataset.boardId
      : null;
    const uri = `/api/boards`;
    const body = {
      previousBoardId,
      id: this.id,
    };
    try {
      const response = await fetch(uri, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(message);
      }
    } catch {
      alert('보드 위치를 업데이트하지 못했습니다.');
    }
  }
}

export default Board;
