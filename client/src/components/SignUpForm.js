import './SignUpForm.css';

function SignUpForm() {
  const $signUpForm = document.createElement('form');
  const $idBox = document.createElement('div');
  const $idInputLabel = document.createElement('label');
  const $idInput = document.createElement('input');
  const $passwordBox = document.createElement('div');
  const $passwordInputLabel = document.createElement('label');
  const $passwordInput = document.createElement('input');
  const $submitButton = document.createElement('button');

  $signUpForm.className = 'sign-up-form';
  $signUpForm.setAttribute('autocomplete', 'off');

  $idBox.className = 'box--column';

  $passwordBox.className = 'box--column';

  $idInputLabel.className = 'sign-up-form__label';
  $idInputLabel.innerHTML = 'Id';
  $idInputLabel.htmlFor = 'id';

  $idInput.className = 'sign-up-form__input sign-up-form__input--mt';
  $idInput.setAttribute('type', 'text');
  $idInput.id = 'id';

  $passwordInputLabel.className = 'sign-up-form__label';
  $passwordInputLabel.innerHTML = 'Password';
  $passwordInputLabel.htmlFor = 'password';

  $passwordInput.className = 'sign-up-form__input sign-up-form__input--mt';
  $passwordInput.setAttribute('type', 'password');
  $passwordInput.id = 'password';

  $submitButton.className =
    'sign-up-form__submit-button sign-up-form__submit-button--mt';
  $submitButton.innerHTML = 'Create account';

  $idBox.appendChild($idInputLabel);
  $idBox.appendChild($idInput);

  $passwordBox.appendChild($passwordInputLabel);
  $passwordBox.appendChild($passwordInput);

  $signUpForm.appendChild($idBox);
  $signUpForm.appendChild($passwordBox);
  $signUpForm.appendChild($submitButton);

  return $signUpForm;
}

export default SignUpForm;
