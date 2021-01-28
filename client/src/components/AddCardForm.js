import './AddCardForm.css';

function AddCardForm({ $textArea, onSubmit }) {
  const $addCardForm = document.createElement('form');
  $addCardForm.className = 'add-card-form add-card-form--m';

  const $buttonContainer = document.createElement('div');
  $buttonContainer.className =
    'add-card-form__button-container add-card-form__button-container--m';

  const $addButton = document.createElement('button');
  $addButton.className =
    'add-card-form__add-button add-card-form__add-button--mr';
  $addButton.innerHTML = 'Add';
  $addButton.addEventListener('click', onSubmit);

  const $cancelButton = document.createElement('button');
  $cancelButton.className = 'add-card-form__cancel-button';
  $cancelButton.innerHTML = 'Cancel';

  const clickCancleButtonHandler = event => {
    event.preventDefault();

    $addCardForm.remove();
  };

  $cancelButton.addEventListener('click', clickCancleButtonHandler);

  $buttonContainer.appendChild($addButton);
  $buttonContainer.appendChild($cancelButton);
  $addCardForm.appendChild($textArea);
  $addCardForm.appendChild($buttonContainer);

  return $addCardForm;
}

export default AddCardForm;
