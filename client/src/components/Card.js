import './Card.css';

import MoreIcon from '../assets/more.svg';
import NoteIcon from '../assets/note.svg';

function Card({ content }) {
  const $card = document.createElement('div');
  $card.className = 'card card--my';

  const $cardInner = document.createElement('div');
  $cardInner.className = 'card__inner--relative';

  const $cardIcon = document.createElement('div');
  $cardIcon.className = 'card__icon';
  $cardIcon.innerHTML = `<img src='${NoteIcon}' />`;

  const $cardBody = document.createElement('div');
  $cardBody.className = 'card__body';

  const $cardContent = document.createElement('div');
  $cardContent.className = 'card__body--content';
  $cardContent.innerHTML = content;

  const $cardAuthor = document.createElement('div');
  $cardAuthor.className = 'card__body--author';
  $cardAuthor.innerHTML = 'Added By test';

  $cardBody.appendChild($cardContent);
  $cardBody.appendChild($cardAuthor);

  const $moreButton = document.createElement('div');
  $moreButton.className = 'card__more-button';
  $moreButton.innerHTML = `<img src='${MoreIcon}' />`;

  $cardInner.appendChild($cardIcon);
  $cardInner.appendChild($cardBody);
  $cardInner.append($moreButton);
  $card.appendChild($cardInner);

  return $card;
}

export default Card;
