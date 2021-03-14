import './EditBoardModal.css';

import CloseIcon from '../assets/close.svg';

import { createAction } from '../lib/todox';
import boardStore from '../store/boardStore';

class EditBoardModal {
  constructor({ text, boardId }) {
    this.element = document.createElement('div');

    this.text = text;
    this.boardId = boardId;

    this.closeModalHandler = this.closeModalHandler.bind(this);
    this.changeInputHandler = this.changeInputHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  render() {
    this.element.className = 'edit-board-modal__overlay';
    this.element.innerHTML = `
      <div class='edit-board-modal'>
        <div class='edit-board-modal__header'>
          <div class='edit-board-modal__title'>Edit a board</div>
          <div class='edit-board-modal__close-button'>
            <img src=${CloseIcon} />
          </div>
        </div>
        <form class='edit-board-modal__body'>
          <label class='edit-board-modal__label' for='name'>Name</label>
          <input
            id='name'
            class='edit-board-modal__text-input edit-board-modal__text-input--m'
            type='text'
            name='name'
            value='${this.text}'
          />
          <button class='edit-board-modal__save-button edit-board-modal__save-button--mt'>
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
        event.target.matches('.edit-board-modal__overlay') ||
        event.target.closest('.edit-board-modal__close-button')
      )
    ) {
      return;
    }
    event.preventDefault();
    this.element.remove();
  }

  changeInputHandler(event) {
    if (!event.target.matches('.edit-board-modal__text-input')) {
      return;
    }
    event.preventDefault();
    this.text = event.target.value;
  }

  async submitHandler(event) {
    if (!event.target.closest('.edit-board-modal__body')) {
      return;
    }
    event.preventDefault();
    const uri = `/api/boards/${this.boardId}`;
    const body = { name: this.text };
    try {
      const response = await fetch(uri, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }
      boardStore.dispatch(
        createAction('ACTION_UPDATE_NAME', {
          id: this.boardId,
          name: this.text,
        }),
      );
      this.element.remove();
    } catch {
      alert('보드 이름을 수정할 수 없습니다.');
    }
  }
}

export default EditBoardModal;
