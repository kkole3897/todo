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

export { addRemoveCardEvent }
