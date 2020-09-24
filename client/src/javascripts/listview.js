class ListView {
    getList(userId) {
        fetch(`http://localhost:3000/list`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(res => this.render(res));
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
