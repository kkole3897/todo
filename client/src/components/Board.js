import './Board.css';

import PlusIcon from '../assets/plus.svg';
import MoreIcon from '../assets/more.svg';

import AddCardForm from './AddCardForm';
import Card from './Card';

function Board({ title = '' }) {
  let count = 0;
  let isAddCardFormOpened = false;

  const clickPlusButtonHandler = event => {
    if (isAddCardFormOpened) {
      $addCardForm.remove();
    } else {
      const parent = event.target.closest('.board__inner');
      parent.insertBefore($addCardForm, $boardBody);
    }
    isAddCardFormOpened = !isAddCardFormOpened;
  };

  const clickAddButtonHandler = event => {
    event.preventDefault();
    const cardText = $textArea.value;
    $textArea.value = '';
    const $card = Card({ content: cardText });
    count += 1;
    isAddCardFormOpened = !isAddCardFormOpened;
    $cardCount.innerHTML = count;
    $addButton.disabled = true;
    $addCardForm.remove();
    $boardBody.appendChild($card);
  };

  const clickCancleButtonHandler = event => {
    event.preventDefault();
    $textArea.value = '';
    isAddCardFormOpened = !isAddCardFormOpened;
    $addButton.disabled = true;
    $addCardForm.remove();
  };

  const inputTextAreaHandler = event => {
    if ($textArea.value.length > 0) {
      $addButton.disabled = false;
    } else {
      $addButton.disabled = true;
    }
  };

  const $board = document.createElement('div');
  $board.className = 'board';

  const $boardInner = document.createElement('div');
  $boardInner.className = 'board__inner';

  const $boardHeader = document.createElement('div');
  $boardHeader.className = 'board__header';

  const $boardBody = document.createElement('div');
  $boardBody.className = 'board__body';

  const $leftDiv = document.createElement('div');
  $leftDiv.className = 'flex';

  const $rightDiv = document.createElement('div');
  $rightDiv.className = 'flex';

  const $cardCount = document.createElement('div');
  $cardCount.className = 'board__card-count';
  $cardCount.innerHTML = count;

  const $title = document.createElement('div');
  $title.className = 'board__title board__title--ml';
  $title.innerHTML = title;

  const $openCardFormButton = document.createElement('div');
  $openCardFormButton.className =
    'board__open-card-form-button board__open-card-form-button--mr';
  $openCardFormButton.innerHTML = `<img src=${PlusIcon} />`;
  $openCardFormButton.addEventListener('click', clickPlusButtonHandler);

  const $moreButton = document.createElement('div');
  $moreButton.className = 'board__more-button';
  $moreButton.innerHTML = `<img src=${MoreIcon} />`;

  const $textArea = document.createElement('textarea');
  $textArea.className = 'add-card-form__textarea';
  $textArea.placeholder = 'Enter a note';

  const $addButton = document.createElement('button');

  const $addCardForm = AddCardForm({
    $textArea,
    $addButton,
    onSubmit: clickAddButtonHandler,
    onCancel: clickCancleButtonHandler,
    onChanged: inputTextAreaHandler,
  });

  $leftDiv.appendChild($cardCount);
  $leftDiv.appendChild($title);
  $rightDiv.appendChild($openCardFormButton);
  $rightDiv.appendChild($moreButton);
  $boardHeader.appendChild($leftDiv);
  $boardHeader.appendChild($rightDiv);
  $boardInner.appendChild($boardHeader);
  $boardInner.appendChild($boardBody);
  $board.appendChild($boardInner);

  return $board;
}

export default Board;
