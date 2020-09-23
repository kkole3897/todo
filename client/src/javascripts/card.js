function renderCardInput(target) {
    const cardInputForm = `
        <div class="card-input">
            <form method="post">
                <textarea name="description" type="text" placeholder="Enter a note">
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

export { addOpenCardInputEvent }
