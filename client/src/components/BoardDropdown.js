import './BoardDropdown.css';

class BoardDropdown {
  constructor({ openEditor, onDelete }) {
    this.element = document.createElement('div');

    this.openEditor = openEditor;
    this.onDelete = onDelete;

    this.closeDropdownHandler = this.closeDropdownHandler.bind(this);
    this.clickEditHandler = this.clickEditHandler.bind(this);
    this.clickDeleteHandler = this.clickDeleteHandler.bind(this);
  }

  render() {
    this.element.className = 'board__dropdown';

    this.element.innerHTML = `
      <div class='board__dropdown--overlay'></div>
      <div class='board__dropdown--menu'>
        <div class='board__dropdown--menu-item board__dropdown--menu-item-edit'>Edit</div>
        <div class='board__dropdown--menu-item board__dropdown--menu-item-delete'>Delete</div>
      </div>
    `;

    this.element.addEventListener('click', this.closeDropdownHandler);

    return this.element;
  }

  closeDropdownHandler(event) {
    if (!event.target.matches('.board__dropdown--overlay')) {
      return;
    }
    event.preventDefault();
    this.element.remove();
  }

  clickEditHandler(event) {
    event.preventDefault();
  }

  clickDeleteHandler(event) {
    event.preventDefault();
  }
}

export default BoardDropdown;
