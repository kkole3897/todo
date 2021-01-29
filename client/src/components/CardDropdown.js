import './CardDropdown.css';

function CardDropdown() {
  const $dropdown = document.createElement('div');
  $dropdown.className = 'card__dropdown';

  const $editMenu = document.createElement('div');
  $editMenu.className = 'card__dropdown--menu-item';
  $editMenu.innerHTML = 'Edit';

  const $deleteMenu = document.createElement('div');
  $deleteMenu.className = 'card__dropdown--menu-item';
  $deleteMenu.innerHTML = 'Delete';

  $dropdown.appendChild($editMenu);
  $dropdown.appendChild($deleteMenu);

  return $dropdown;
}

export default CardDropdown;
