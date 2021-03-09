import './Board.css';

import PlusIcon from '../assets/plus.svg';
import MoreIcon from '../assets/more.svg';

import AddCardForm from './AddCardForm';
import Card from './Card';

class Board {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;

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
    if (!this.state.isAddCardFormOpened) {
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
    this.state.isAddCardFormOpened = value;
  }

  createNewCard() {
    return () => {};
  }

  // $openCardFormButton.addEventListener('click', clickPlusButtonHandler);

  // let isAddCardFormOpened = false;

  // const clickPlusButtonHandler = event => {
  //   if (isAddCardFormOpened) {
  //     $addCardForm.remove();
  //   } else {
  //     const parent = event.target.closest('.board__inner');
  //     parent.insertBefore($addCardForm, $boardBody);
  //   }
  //   isAddCardFormOpened = !isAddCardFormOpened;
  // };

  // const clickAddButtonHandler = event => {
  //   event.preventDefault();
  //   const cardText = $textArea.value;
  //   $textArea.value = '';
  //   const $card = Card({ content: cardText, onRemove: removeCardHandler });
  //   count += 1;
  //   isAddCardFormOpened = !isAddCardFormOpened;
  //   $cardCount.innerHTML = count;
  //   $addButton.disabled = true;
  //   $addCardForm.remove();
  //   $boardBody.prepend($card);
  // };

  // const clickCancleButtonHandler = event => {
  //   event.preventDefault();
  //   $textArea.value = '';
  //   isAddCardFormOpened = !isAddCardFormOpened;
  //   $addButton.disabled = true;
  //   $addCardForm.remove();
  // };

  // const inputTextAreaHandler = event => {
  //   if ($textArea.value.length > 0) {
  //     $addButton.disabled = false;
  //   } else {
  //     $addButton.disabled = true;
  //   }
  // };

  // const removeCardHandler = event => {
  //   const $card = event.target.closest('.card');
  //   $card.remove();
  //   count -= 1;
  //   $cardCount.innerHTML = count;
  // };

  // $cardCount.innerHTML = count;

  // $title.innerHTML = title;

  // const $textArea = document.createElement('textarea');
  // $textArea.className = 'add-card-form__textarea';
  // $textArea.placeholder = 'Enter a note';

  // const $addButton = document.createElement('button');

  // const $addCardForm = AddCardForm({
  //   $textArea,
  //   $addButton,
  //   onSubmit: clickAddButtonHandler,
  //   onCancel: clickCancleButtonHandler,
  //   onChanged: inputTextAreaHandler,
  // });
}

export default Board;
