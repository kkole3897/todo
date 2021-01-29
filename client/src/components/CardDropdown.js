import './CardDropdown.css';

function CardDropdown() {
  const $dropdown = document.createElement('div');
  $dropdown.className = 'card__dropdown';

  const $editMenu = document.createElement('div');
  $editMenu.className = 'card__dropdown--menu';
  $editMenu.innerHTML = 'Edit';

  const $deleteMenu = document.createElement('div');
  $deleteMenu.className = 'card__dropdown--menu';
  $deleteMenu.innerHTML = 'Delete';

  $dropdown.appendChild($editMenu);
  $dropdown.appendChild($deleteMenu);

  return $dropdown;
}

export default CardDropdown;
