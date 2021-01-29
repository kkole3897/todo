import './CardEditor.css';

import CloseIcon from '../assets/close.svg';

function CardEditor() {
  const $cardEditor = document.createElement('div');
  $cardEditor.className = 'card-editor card-editor--absolute';

  const $cardEditorHeader = document.createElement('div');
  $cardEditorHeader.className = 'card-editor__header';

  const $cardEditorTitle = document.createElement('div');
  $cardEditorTitle.className = 'card-editor__title';
  $cardEditorTitle.innerHTML = 'Edit note';

  const $cardEditorCloseButton = document.createElement('div');
  $cardEditorCloseButton.className = 'card-editor__close-button';
  $cardEditorCloseButton.innerHTML = `<img src='${CloseIcon}' />`;

  const $cardEditorForm = document.createElement('form');
  $cardEditorForm.className = 'card-editor__form';

  const $cardEditorBodyLabel = document.createElement('label');
  $cardEditorBodyLabel.className = 'card-editor__label';
  $cardEditorBodyLabel.innerHTML = 'Note';

  const $cardEditorTextArea = document.createElement('textarea');
  $cardEditorTextArea.className = 'card-editor__textarea';

  const $cardEditorSaveButton = document.createElement('button');
  $cardEditorSaveButton.className = 'card-editor__save-button';
  $cardEditorSaveButton.innerHTML = 'Save note';

  $cardEditorHeader.appendChild($cardEditorTitle);
  $cardEditorHeader.appendChild($cardEditorCloseButton);
  $cardEditorForm.appendChild($cardEditorBodyLabel);
  $cardEditorForm.appendChild($cardEditorTextArea);
  $cardEditorForm.appendChild($cardEditorSaveButton);
  $cardEditor.appendChild($cardEditorHeader);
  $cardEditor.appendChild($cardEditorForm);

  return $cardEditor;
}

export default CardEditor;
