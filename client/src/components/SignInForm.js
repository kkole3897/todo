import './SignInForm.css';

function SignInForm() {
  const $signInContainer = document.createElement('div');
  const $signInForm = document.createElement('form');
  const $idBox = document.createElement('div');
  const $idLabel = document.createElement('label');
  const $idInput = document.createElement('input');
  const $passwordBox = document.createElement('div');
  const $passwordLabel = document.createElement('label');
  const $passwordInput = document.createElement('input');
  const $submitButton = document.createElement('button');
  const $signUpBox = document.createElement('div');
  const $signUpLink = document.createElement('a');

  $signInContainer.className = 'sign-in-container';
  $signInForm.className = 'sign-in-form';
  $idBox.className = 'sign-in-form__box';
  $idLabel.className = 'sign-in-form__label';
  $idInput.className = 'sign-in-form__input sign-in-form__input--m';
  $passwordBox.className = 'sign-in-form__box';
  $passwordLabel.className = 'sign-in-form__label';
  $passwordInput.className = 'sign-in-form__input sign-in-form__input--m';
  $submitButton.className = 'sign-in-form__submit-button';
  $signUpBox.className = 'box__sign-up box__sign-up--mt';
  $signUpLink.className = 'link__sign-up';

  $idLabel.innerHTML = 'id';
  $passwordLabel.innerHTML = 'password';
  $submitButton.innerHTML = 'Sign in';
  $signUpLink.innerHTML = 'Create an account';

  $idBox.appendChild($idLabel);
  $idBox.appendChild($idInput);
  $passwordBox.appendChild($passwordLabel);
  $passwordBox.appendChild($passwordInput);
  $signInForm.appendChild($idBox);
  $signInForm.appendChild($passwordBox);
  $signInForm.appendChild($submitButton);
  $signUpBox.appendChild($signUpLink);
  $signInContainer.appendChild($signInForm);
  $signInContainer.appendChild($signUpBox);

  return $signInContainer;
}

export default SignInForm;
