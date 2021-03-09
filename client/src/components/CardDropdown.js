import './CardDropdown.css';

class CardDropdown {
  render() {
    const element = document.createElement('div');
    element.className = 'card__dropdown';

    element.innerHTML = `
      <div class='card__dropdown--overlay'></div>
      <div class='card__dropdown--menu'>
        <div class='card__dropdown--menu-item'>Edit</div>
        <div class='card__dropdown--menu-item'>Delete</div>
      </div>
    `;

    element.addEventListener('click', this.closeDropdownHandler);

    return element;
  }

  closeDropdownHandler(event) {
    if (!event.target.closest('.card__dropdown--overlay')) {
      return;
    }
    event.preventDefault();
    const cardDropdown = event.target.closest('.card__dropdown');
    cardDropdown.remove();
  }
}

export default CardDropdown;
