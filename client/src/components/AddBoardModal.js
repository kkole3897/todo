import './AddBoardModal.css';

import CloseIcon from '../assets/close.svg';

function AddBoardModal({ onClick }) {
  const closeModalHandler = event => {
    const $addBoardModal = event.target.closest('.add-board-modal');
    $addBoardModal.remove();
  };

  function render() {
    const $addBoardModal = document.createElement('div');
    $addBoardModal.className = 'add-board-modal';

    const $addBoardModalOverlay = document.createElement('div');
    $addBoardModalOverlay.className = 'add-board-modal__overlay';
    $addBoardModalOverlay.addEventListener('click', closeModalHandler);

    const $addBoardModalForm = document.createElement('div');
    $addBoardModalForm.className = 'add-board-modal__form';

    const $modalHeader = document.createElement('div');
    $modalHeader.className = 'add-board-modal__header';

    const $modalTitle = document.createElement('div');
    $modalTitle.className = 'add-board-modal__title';
    $modalTitle.innerText = 'Add a board';

    const $modalCloseButton = document.createElement('div');
    $modalCloseButton.className = 'add-board-modal__close-button';
    $modalCloseButton.innerHTML = `<img src='${CloseIcon}' />`;
    $modalCloseButton.addEventListener('click', closeModalHandler);

    const $modalBody = document.createElement('form');
    $modalBody.className = 'add-board-modal__body';

    const $addBoardInputLabel = document.createElement('label');
    $addBoardInputLabel.className = 'add-board-modal__label';
    $addBoardInputLabel.innerText = 'Board name';

    const $addBoardTextInput = document.createElement('input');
    $addBoardTextInput.className =
      'add-board-modal__text-input add-board-modal__text-input--m';
    $addBoardTextInput.type = 'text';
    $addBoardTextInput.placeholder = 'Enter a board name';

    const $createBoardButton = document.createElement('button');
    $createBoardButton.className =
      'add-board-modal__create-button add-board-modal__create-button--mt';
    $createBoardButton.innerText = 'Create board';
    $createBoardButton.addEventListener('click', onClick);

    $addBoardModal.appendChild($addBoardModalOverlay);
    $addBoardModal.appendChild($addBoardModalForm);
    $addBoardModalForm.appendChild($modalHeader);
    $modalHeader.appendChild($modalTitle);
    $modalHeader.appendChild($modalCloseButton);
    $addBoardModalForm.appendChild($modalBody);
    $modalBody.appendChild($addBoardInputLabel);
    $modalBody.appendChild($addBoardTextInput);
    $modalBody.appendChild($createBoardButton);

    return $addBoardModal;
  }

  return render();
}

export default AddBoardModal;
