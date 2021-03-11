import cardStore from '../store/cardStore';

import './Board.css';

import PlusIcon from '../assets/plus.svg';
import MoreIcon from '../assets/more.svg';

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

    cardStore.subscribe(this.createNewCard, this);
    cardStore.subscribe(this.deleteCard, this);
  }

  render() {
    this.element.className = 'board board--mr';
    this.element.dataset.boardId = this.id;
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
        onDelete: null,
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
        boardId: this.boardId,
      }).render(),
    );
  }
}

export default Board;
