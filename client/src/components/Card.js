import './Card.css';

import MoreIcon from '../assets/more.svg';
import NoteIcon from '../assets/note.svg';

import CardDropdown from './CardDropdown';

class Card {
  constructor({ content, author }) {
    this.content = content;
    this.author = author;
  }

  render() {
    const element = document.createElement('div');
    element.className = 'card card--my';

    element.innerHTML = `
      <div class='card__inner--relative'>
        <div class='card__icon'>
          <img src=${NoteIcon} />
        </div>
        <div class='card__body'>
          <div class='card__body--content'>${this.content}</div>
          <div class='card__body--author'>${this.author}</div>
        </div>
        <div class='card__more-button'>
          <img src=${MoreIcon} />
        </div>
      </div>
    `;

    element.addEventListener('click', this.clickMoreButtonHandler);

    return element;
  }

  clickMoreButtonHandler(event) {
    if (!event.target.closest('.card__more-button')) {
      return;
    }
    event.preventDefault();
    const cardDropdown = new CardDropdown();
    const moreButton = event.target.closest('.card__more-button');
    moreButton.appendChild(cardDropdown.render());
  }

  // const clickMoreButtonHandler = () => {
  //   if (!isDropdownOpened) {
  //     $moreButton.appendChild($dropdown);
  //   } else {
  //     $dropdown.remove();
  //   }
  //   isDropdownOpened = !isDropdownOpened;
  // };

  // $moreButton.addEventListener('click', clickMoreButtonHandler);

  // const $dropdown = CardDropdown({ onRemove });
}

export default Card;
