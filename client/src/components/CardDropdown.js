import './CardDropdown.css';

class CardDropdown {
  constructor({ openEditor }) {
    this.element = document.createElement('div');

    this.openEditor = openEditor;

    this.closeDropdownHandler = this.closeDropdownHandler.bind(this);
    this.clickEditHandler = this.clickEditHandler.bind(this);
  }

  render() {
    this.element.className = 'card__dropdown';

    this.element.innerHTML = `
      <div class='card__dropdown--overlay'></div>
      <div class='card__dropdown--menu'>
        <div class='card__dropdown--menu-item card__dropdown--menu-item-edit'>Edit</div>
        <div class='card__dropdown--menu-item'>Delete</div>
      </div>
    `;

    this.element.addEventListener('click', this.closeDropdownHandler);
    this.element.addEventListener('click', this.clickEditHandler);

    return this.element;
  }

  closeDropdownHandler(event) {
    if (!event.target.closest('.card__dropdown--overlay')) {
      return;
    }
    event.preventDefault();
    const cardDropdown = event.target.closest('.card__dropdown');
    cardDropdown.remove();
  }

  clickEditHandler(event) {
    if (!event.target.matches('.card__dropdown--menu-item-edit')) {
      return;
    }
    this.openEditor();
    this.element.remove();
  }
}

export default CardDropdown;
