import './CardDropdown.css';

class CardDropdown {
  constructor({ openEditor, onDelete }) {
    this.element = document.createElement('div');

    this.openEditor = openEditor;
    this.onDelete = onDelete;

    this.closeDropdownHandler = this.closeDropdownHandler.bind(this);
    this.clickEditHandler = this.clickEditHandler.bind(this);
    this.clickDeleteHandler = this.clickDeleteHandler.bind(this);
  }

  render() {
    this.element.className = 'card__dropdown';

    this.element.innerHTML = `
      <div class='card__dropdown--overlay'></div>
      <div class='card__dropdown--menu'>
        <div class='card__dropdown--menu-item card__dropdown--menu-item-edit'>Edit</div>
        <div class='card__dropdown--menu-item card__dropdown--menu-item-delete'>Delete</div>
      </div>
    `;

    this.element.addEventListener('click', this.closeDropdownHandler);
    this.element.addEventListener('click', this.clickEditHandler);
    this.element.addEventListener('click', this.clickDeleteHandler);

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

  clickDeleteHandler(event) {
    if (!event.target.matches('.card__dropdown--menu-item-delete')) {
      return;
    }
    this.onDelete();
    this.element.remove();
  }

  // TODO: 객체 자신을 메모리에 반환할 수 있는 안전한 destroy 필요
}

export default CardDropdown;
