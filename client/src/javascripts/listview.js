import CardInputView from './card-input-view.js';

class ListView {
    constructor() {
        this.cardInputView = new CardInputView();
    }

    getList(userId) {
        return fetch(`http://localhost:3000/list`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(res => this.render(res));
    }

    addOpenCardInputEvent() {
        const icons = document.querySelectorAll('.todo-list__add-icon--width');
        icons.forEach(icon => {
            const btn = icon.parentNode;
            const target = btn.closest('.todo-list__header');
            btn.addEventListener('click', () => {
                if (btn.getAttribute('aria-expand') === 'true') {
                    btn.setAttribute('aria-expand', 'false');
                    this.cardInputView.hide(target);
                } else {
                    btn.setAttribute('aria-expand', 'true');
                    this.cardInputView.render(target);
                }
            });
        });
    }

    render(res) {
        const listHeaders = document.querySelectorAll('.todo-list');
        const zipElements = Array.from(listHeaders).map((e, i) => {
            return [e, res.data[i]];
        });
        for (let [element, data] of zipElements) {
            element.setAttribute('data-list-id', data['list_id']);
            const elNumber = element.querySelector('.todo-list__card-number--draw-shape');
            const elTitle = element.querySelector('.todo-list__title');
            elNumber.textContent = data.count;
            elTitle.textContent = data.title;
        }
    }
}

export default ListView;
