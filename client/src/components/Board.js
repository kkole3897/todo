import './Board.css';
import PlusIcon from '../assets/plus.svg';
import MoreIcon from '../assets/more.svg';

import AddCardForm from './AddCardForm';

function Board({ title = '' }) {
  const $board = document.createElement('div');
  $board.className = 'board';

  const $boardInner = document.createElement('div');
  $boardInner.className = 'board__inner';

  const $boardHeader = document.createElement('div');
  $boardHeader.className = 'board__header';

  const $leftDiv = document.createElement('div');
  $leftDiv.className = 'flex';

  const $rightDiv = document.createElement('div');
  $rightDiv.className = 'flex';

  const $cardCount = document.createElement('div');
  $cardCount.className = 'board__card-count';
  $cardCount.innerHTML = 0;

  const $title = document.createElement('div');
  $title.className = 'board__title board__title--ml';
  $title.innerHTML = title;

  const $addCardButton = document.createElement('div');
  $addCardButton.className =
    'board__add-card-button board__add-card-button--mr';
  $addCardButton.innerHTML = `<img src=${PlusIcon} />`;

  const $moreButton = document.createElement('div');
  $moreButton.className = 'board__more-button';
  $moreButton.innerHTML = `<img src=${MoreIcon} />`;

  $leftDiv.appendChild($cardCount);
  $leftDiv.appendChild($title);
  $rightDiv.appendChild($addCardButton);
  $rightDiv.appendChild($moreButton);
  $boardHeader.appendChild($leftDiv);
  $boardHeader.appendChild($rightDiv);
  $boardInner.appendChild($boardHeader);
  $boardInner.appendChild(AddCardForm());
  $board.appendChild($boardInner);

  return $board;
}

export default Board;
