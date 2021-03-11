import './EditCardModal.css';

import CloseIcon from '../assets/close.svg';

import { createAction } from '../lib/todox';
import cardStore from '../store/cardStore';

class EditCardModal {
  constructor({ text, boardId, cardId }) {
    this.element = document.createElement('div');

    this.text = text;
    this.boardId = boardId;
    this.cardId = cardId;

    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  render() {
    this.element.className = 'edit-card-modal__overlay';
    this.element.innerHTML = `
      <div class='edit-card-modal'>
        <div class='edit-card-modal__header'>
          <div class='edit-card-modal__title'>Edit a card</div>
          <div class='edit-card-modal__close-button'>
            <img src=${CloseIcon} />
          </div>
        </div>
        <form class='edit-card-modal__body'>
          <label class='edit-card-modal__label' for='description'>Description</label>
          <textarea
            id='description'
            class='edit-card-modal__text-input edit-card-modal__text-input--m'
            type='text'
            name='description'
            rows='8'
          >${this.text}</textarea>
          <button class='edit-card-modal__save-button edit-card-modal__save-button--mt'>
            Save
          </button>
        </form>
      </div>
    `;

    this.element.addEventListener('click', this.closeModalHandler);
    this.element.addEventListener('input', this.changeInputHandler);
    this.element.addEventListener('submit', this.submitHandler);

    return this.element;
  }

  closeModalHandler(event) {
    if (
      !(
        event.target.matches('.edit-card-modal__overlay') ||
        event.target.closest('.edit-card-modal__close-button')
      )
    ) {
      return;
    }
    this.element.remove();
  }

  changeInputHandler(event) {
    this.text = event.target.value;
  }

  async submitHandler(event) {
    if (!event.target.closest('.edit-card-modal__body')) {
      return;
    }
    event.preventDefault();
    const uri = `/api/boards/${this.boardId}/cards/${this.cardId}/description`;
    const body = {
      description: this.text,
    };
    try {
      const response = await fetch(uri, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const { message, data } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }
      cardStore.dispatch(
        createAction('ACTION_UPDATE_DESCRIPTION', {
          id: this.cardId,
          description: this.text,
        }),
      );
      this.element.remove();
    } catch {
      alert('카드 description 수정 실패.');
      this.element.remove();
    }
  }
}

export default EditCardModal;
