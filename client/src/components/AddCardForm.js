import './AddCardForm.css';

function AddCardForm({ $textArea, $addButton, onSubmit, onCancel, onChanged }) {
  const $addCardForm = document.createElement('form');
  $addCardForm.className = 'add-card-form add-card-form--m';

  const $buttonContainer = document.createElement('div');
  $buttonContainer.className =
    'add-card-form__button-container add-card-form__button-container--m';

  $textArea.addEventListener('input', onChanged);

  $addButton.className =
    'add-card-form__add-button add-card-form__add-button--mr';
  $addButton.innerHTML = 'Add';
  $addButton.disabled = true;
  $addButton.addEventListener('click', onSubmit);

  const $cancelButton = document.createElement('button');
  $cancelButton.className = 'add-card-form__cancel-button';
  $cancelButton.innerHTML = 'Cancel';

  $cancelButton.addEventListener('click', onCancel);

  $buttonContainer.appendChild($addButton);
  $buttonContainer.appendChild($cancelButton);
  $addCardForm.appendChild($textArea);
  $addCardForm.appendChild($buttonContainer);

  return $addCardForm;
}

export default AddCardForm;
