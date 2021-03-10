import './AddCardForm.css';

import Card from './Card';

class AddCardForm {
  constructor({ setOpened, addCard }) {
    this.state = {
      text: '',
    };

    this.setOpened = setOpened;
    this.addCard = addCard;

    this.inputTextAreaHandler = this.inputTextAreaHandler.bind(this);
    this.clickCancelButtonHandler = this.clickCancelButtonHandler.bind(this);
    this.submitAddCardHandler = this.submitAddCardHandler.bind(this);
  }

  render() {
    const element = document.createElement('form');
    element.className = 'add-card-form add-card-form--m';
    element.innerHTML = `
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

    element.addEventListener('input', this.inputTextAreaHandler);
    element.addEventListener('click', this.clickCancelButtonHandler);
    element.addEventListener('submit', this.submitAddCardHandler);

    return element;
  }

  inputTextAreaHandler(event) {
    if (!event.target.matches('.add-card-form__textarea')) {
      return;
    }
    event.preventDefault();
    this.state.text = event.target.value;
    const addCardForm = event.target.closest('.add-card-form');
    const addButton = addCardForm.querySelector('.add-card-form__add-button');
    addButton.disabled = this.state.text.length <= 0;
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

  submitAddCardHandler(event) {
    if (!event.target.closest('.add-card-form')) {
      return;
    }
    event.preventDefault();
    const card = new Card({
      id: null,
      description: this.state.text,
      author: '테스트',
      boardId: null,
    });
    const addCardForm = event.target.closest('.add-card-form');
    addCardForm.insertAdjacentElement('afterend', card.render());
    this.setOpened(false);
    addCardForm.parentNode.removeChild(addCardForm);
  }
}

export default AddCardForm;
