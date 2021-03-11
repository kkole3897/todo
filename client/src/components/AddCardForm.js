import { createAction } from '../lib/todox';
import userStore from '../store/userStore';
import cardStore from '../store/cardStore';

import './AddCardForm.css';

class AddCardForm {
  constructor({ boardId, setOpened }) {
    this.element = document.createElement('form');
    this.text = '';
    this.boardId = boardId;

    this.setOpened = setOpened;

    this.inputTextAreaHandler = this.inputTextAreaHandler.bind(this);
    this.clickCancelButtonHandler = this.clickCancelButtonHandler.bind(this);
    this.submitAddCardHandler = this.submitAddCardHandler.bind(this);
  }

  render() {
    this.element.className = 'add-card-form add-card-form--m';
    this.element.innerHTML = `
      <textarea class='add-card-form__textarea'></textarea>
      <div class='add-card-form__button-container add-card-form__button-container--m'>
        <button 
          class='add-card-form__add-button add-card-form__add-button--mr' 
          disabled
        >
          Add
        </button>
        <button class='add-card-form__cancel-button'>Cancel</button>
      </div>
    `;

    this.element.addEventListener('input', this.inputTextAreaHandler);
    this.element.addEventListener('click', this.clickCancelButtonHandler);
    this.element.addEventListener('submit', this.submitAddCardHandler);

    return this.element;
  }

  inputTextAreaHandler(event) {
    if (!event.target.matches('.add-card-form__textarea')) {
      return;
    }
    event.preventDefault();
    this.text = event.target.value;
    const addCardForm = event.target.closest('.add-card-form');
    const addButton = addCardForm.querySelector('.add-card-form__add-button');
    addButton.disabled = this.text.length <= 0;
  }

  clickCancelButtonHandler(event) {
    if (!event.target.matches('.add-card-form__cancel-button')) {
      return;
    }
    event.preventDefault();
    const addCardForm = event.target.closest('.add-card-form');
    this.setOpened(false);
    addCardForm.parentNode.removeChild(addCardForm);
  }

  async submitAddCardHandler(event) {
    if (!event.target.closest('.add-card-form')) {
      return;
    }
    event.preventDefault();
    const uri = `/api/boards/${this.boardId}/cards`;
    const body = {
      description: this.text,
    };
    try {
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const { message, data } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }
      const { user } = userStore.getState();
      cardStore.dispatch(
        createAction('ACTION_ADD_CARD', {
          card: {
            id: data.id,
            description: this.text,
            author: user.id,
            boardId: this.boardId,
          },
        }),
      );
      this.setOpened(false);
      this.element.remove();
    } catch {
      this.setOpened(false);
      this.element.remove();
      alert('새로운 카드를 추가할 수 없습니다.');
    }
  }
}

export default AddCardForm;
