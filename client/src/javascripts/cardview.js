class CardView {
    getCards() {
        return fetch('http://localhost:3000/card')
        .then(res => res.json())
        .then(res => this.render(res));
    }

    render(res) {
        res.data.forEach(card => {
            const elParent = document.querySelector("section[data-list-id='" + card['list_id'].toString() + "']");
            const target = elParent.querySelector('.todo-list__body ul');
            const innerHTML = `
                <li class="card--margin" data-card-id="${card['card_id']}">
                    <div class="card__container card__container--padding card__contiainer--background">
                        <div class="card__content">
                            <div>
                                <img class="card__logo" src="./images/card_logo.png" alt="카드 로고">
                            </div>
                            <div class="card__description--margin">
                                ${card.description}
                            </div>
                        </div>
                        <div class="card__remove-button">
                            <button class="card__remove-button--background">
                                <svg class="card__remove-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.001 512.001">
                                        <path
                                            d="M284.286 256.002L506.143 34.144c7.811-7.811 7.811-20.475 0-28.285-7.811-7.81-20.475-7.811-28.285 0L256 227.717 34.143 5.859c-7.811-7.811-20.475-7.811-28.285 0-7.81 7.811-7.811 20.475 0 28.285l221.857 221.857L5.858 477.859c-7.811 7.811-7.811 20.475 0 28.285a19.938 19.938 0 0014.143 5.857 19.94 19.94 0 0014.143-5.857L256 284.287l221.857 221.857c3.905 3.905 9.024 5.857 14.143 5.857s10.237-1.952 14.143-5.857c7.811-7.811 7.811-20.475 0-28.285L284.286 256.002z" />
                                </svg>
                            </button> 
                        </div>
                    </div> 
                </li>
            `;
            target.insertAdjacentHTML('beforeend', innerHTML);
        })
    }
}

export default CardView;
