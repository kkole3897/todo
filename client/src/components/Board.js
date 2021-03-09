import './Board.css';

import PlusIcon from '../assets/plus.svg';
import MoreIcon from '../assets/more.svg';

import AddCardForm from './AddCardForm';
import Card from './Card';

class Board {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
    this.isAddCardFormOpened = false;

    this.clickOpenCardFormButtonHandler = this.clickOpenCardFormButtonHandler.bind(
      this,
    );
    this.setAddCardFormOpened = this.setAddCardFormOpened.bind(this);
  }

  render() {
    const element = document.createElement('div');
    element.className = 'board board--mr';
    element.dataset.boardId = this.id;
    element.innerHTML = `
      <div class='board__inner'>
        <div class='board__header'>
          <div class='flex'>
            <div class='board__card-count'>0</div>
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

    element.addEventListener('click', this.clickOpenCardFormButtonHandler);

    return element;
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
        setOpened: this.setAddCardFormOpened,
      });
      boardBody.prepend(addCardForm.render());
      this.setAddCardFormOpened(true);
    } else {
      boardBody.removeChild(boardBody.firstChild);
      this.setAddCardFormOpened(false);
    }
  }

  setAddCardFormOpened(value) {
    this.isAddCardFormOpened = value;
  }
}

export default Board;
