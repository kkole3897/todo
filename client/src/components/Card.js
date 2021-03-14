import './Card.css';

import MoreIcon from '../assets/more.svg';
import NoteIcon from '../assets/note.svg';

import { createAction } from '../lib/todox';
import cardStore from '../store/cardStore';
import CardDropdown from './CardDropdown';
import EditCardModal from './EditCardModal';

class Card {
  constructor({ id, description, author, boardId }) {
    this.element = document.createElement('div');

    this.id = id;
    this.description = description;
    this.author = author;
    this.boardId = boardId;

    this.clickMoreButtonHandler = this.clickMoreButtonHandler.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);

    cardStore.subscribe(this.updateDescription, this);
  }

  render() {
    this.element.id = `card-${this.id}`;
    this.element.className = 'card card--my';
    this.element.dataset.cardId = this.id;
    this.element.dataset.boardId = this.boardId;
    this.element.setAttribute('draggable', true);

    this.element.innerHTML = `
      <div class='card__inner--relative'>
        <div class='card__icon'>
          <img src=${NoteIcon} />
        </div>
        <div class='card__body'>
          <div class='card__body--content'>${this.description}</div>
          <div class='card__body--author'>${this.author}</div>
        </div>
        <div class='card__more-button'>
          <img src=${MoreIcon} />
        </div>
      </div>
    `;

    this.element.addEventListener('click', this.clickMoreButtonHandler);
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);

    return this.element;
  }

  clickMoreButtonHandler(event) {
    if (!event.target.closest('.card__more-button')) {
      return;
    }
    event.preventDefault();
    const cardDropdown = new CardDropdown({
      openEditor: this.openEditModal,
      onDelete: this.deleteCard,
    });
    const moreButton = event.target.closest('.card__more-button');
    moreButton.appendChild(cardDropdown.render());
  }

  openEditModal() {
    const editCardModal = new EditCardModal({
      text: this.description,
      boardId: this.boardId,
      cardId: this.id,
    });
    this.element.appendChild(editCardModal.render());
  }

  updateDescription() {
    const card = cardStore
      .getState()
      .cards.filter(card => card.id === this.id)[0];
    if (this.description === card.description) {
      return;
    }
    this.description = card.description;
    const contentElement = this.element.querySelector('.card__body--content');
    contentElement.innerHTML = this.description;
  }

  async deleteCard() {
    const uri = `/api/boards/${this.boardId}/cards/${this.id}`;
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
      cardStore.unsubscribe(this.updateDescription, this);
      cardStore.dispatch(createAction('ACTION_DELETE_CARD', { id: this.id }));
      this.element.remove();
    } catch {
      alert('카드 삭제 실패');
    }
  }

  dragStartHandler(event) {
    event.stopPropagation();
    this.element.style.opacity = 0.5;
    event.dataTransfer.setData('card-id', this.element.id);
    event.dataTransfer.effectAllowed = 'move';
    cardStore.dispatch(
      createAction('ACTION_GRAB_DRAGGED_CARD', { draggedCard: this.element }),
    );
  }

  dragEndHandler(event) {
    event.stopPropagation();
    this.element.style.opacity = '';
    event.dataTransfer.clearData('card-id');
    cardStore.dispatch(createAction('ACTION_DROP_DRAGGED_CARD'));
  }
}

export default Card;
