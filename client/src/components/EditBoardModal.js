import './EditBoardModal.css';

import CloseIcon from '../assets/close.svg';

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
            value=${this.text}
          />
          <button class='edit-board-modal__save-button edit-board-modal__save-button--mt'>
            Save
          </button>
        </form>
      </div>
    `;

    this.element.addEventListener('click', this.closeModalHandler);

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
    event.preventDefault();
  }

  async submitHandler(event) {
    event.preventDefault();
  }
}

export default EditBoardModal;
