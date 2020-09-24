function renderCardInput(target) {
    const cardInputForm = `
        <div class="card-input">
            <form class="card-input__form" action="#" method="post">
                <textarea name="description" type="text" placeholder="Enter a note"></textarea>
                <input type="submit" value="Add">
                <input type="button", value="Cancel">
            </form>
        </div>
        `;
    target.insertAdjacentHTML('afterend', cardInputForm);
}

function hideCardInput(target) {
    target.parentNode.removeChild(target.nextElementSibling);
}

function addOpenCardInputEvent() {
    const icons = document.querySelectorAll('.todo-list__add-icon--width');
    icons.forEach(icon => {
        const btn = icon.parentNode;
        const target = btn.closest('.todo-list__header');
        btn.addEventListener('click', () => {
            if (btn.getAttribute('aria-expand') === 'true') {
                btn.setAttribute('aria-expand', 'false');
                hideCardInput(target);
            } else {
                btn.setAttribute('aria-expand', 'true');
                renderCardInput(target);
            }
        });
    });
}

function addRemoveCardEvent() {
    const todoListBodies = document.querySelectorAll('.todo-list__body');
    todoListBodies.forEach(todoListBody => {
        todoListBody.addEventListener('click', (e) => {
            if(!e.target.closest('.card__remove-button')) return;
            const elCard = e.target.closest('.card--margin');
            const elList = e.target.closest('.todo-list');
            const body = {
                cardId: elCard.getAttribute('data-card-id'),
                listId: elList.getAttribute('data-list-id'),
                description: elCard.querySelector('.card__description--margin').textContent.trim()
            }
            fetchRemoveCard(body);
            elCard.parentNode.removeChild(elCard);
            const elCount = elList.querySelector('.todo-list__card-number--draw-shape');
            if (parseInt(elCount.textContent) > 0) {
                elCount.textContent = parseInt(elCount.textContent) - 1;
            }
        })
    })
}

function fetchRemoveCard({cardId, listId, description}) {
    return fetch('http://localhost:3000/card', {
        method: 'PUT',
        body: JSON.stringify({
            cardId: cardId,
            listId: listId,
            description: description,
            removed: 1
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export { addOpenCardInputEvent, addRemoveCardEvent }
