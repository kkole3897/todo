class CardInputView {
    constructor() {
        this.template = `
            <div class="card-input">
                <form class="card-input__form" action="#" method="post">
                    <div>
                        <textarea class="card-input__textarea" name="description" type="text" placeholder="Enter a note"></textarea>
                    </div>
                    <div class="card-input__button-container">
                        <input class="card-input__button card-input__button--margin-right card-input__button--green" type="submit" value="Add">
                        <input class="card-input__button card-input__button--light-gray" type="button", value="Cancel">
                    </div>
                </form>
            </div>
        `;
    }

    render(target) {
        target.insertAdjacentHTML('afterend', this.template);
    }

    hide(target) {
        target.parentNode.removeChild(target.nextElementSibling);
    }
}

export default CardInputView;
