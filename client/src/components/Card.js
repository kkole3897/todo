import './Card.css';

function Card({ content }) {
  const $card = document.createElement('div');
  $card.className = 'card card--my';

  const $cardInner = document.createElement('div');
  $cardInner.className = 'card__inner--relative';

  const $cardIcon = document.createElement('div');
  $cardIcon.className = 'card__icon';

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

  const $deleteButton = document.createElement('div');
  $deleteButton.className = 'card__delete-button';

  $cardInner.appendChild($cardIcon);
  $cardInner.appendChild($cardBody);
  $cardInner.append($deleteButton);
  $card.appendChild($cardInner);

  return $card;
}

export default Card;
