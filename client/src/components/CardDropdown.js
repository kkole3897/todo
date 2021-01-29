import './CardDropdown.css';

function CardDropdown({ onRemove }) {
  const $dropdown = document.createElement('div');
  $dropdown.className = 'card__dropdown';

  const $dropdownOverlay = document.createElement('div');
  $dropdownOverlay.className = 'card__dropdown--overlay';

  const $dropdownMenu = document.createElement('div');
  $dropdownMenu.className = 'card__dropdown--menu';

  const $editMenu = document.createElement('div');
  $editMenu.className = 'card__dropdown--menu-item';
  $editMenu.innerHTML = 'Edit';

  const $deleteMenu = document.createElement('div');
  $deleteMenu.className = 'card__dropdown--menu-item';
  $deleteMenu.innerHTML = 'Delete';
  $deleteMenu.addEventListener('click', onRemove);

  $dropdownMenu.appendChild($editMenu);
  $dropdownMenu.appendChild($deleteMenu);
  $dropdown.appendChild($dropdownOverlay);
  $dropdown.appendChild($dropdownMenu);

  return $dropdown;
}

export default CardDropdown;
