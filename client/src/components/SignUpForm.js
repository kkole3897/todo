import './SignUpForm.css';
import { debounce } from '../util';

function SignUpForm() {
  const $signUpForm = document.createElement('form');
  const $idBox = document.createElement('div');
  const $idLabel = document.createElement('label');
  const $idInput = document.createElement('input');
  const $passwordBox = document.createElement('div');
  const $passwordLabel = document.createElement('label');
  const $passwordInput = document.createElement('input');
  const $submitButton = document.createElement('button');

  const idInputWaitingTime = 500;
  const passwordInputWaitingTime = 500;
  let isIdProper = false,
    isPasswordProper = false;

  const onIdChanged = event => {
    event.preventDefault();
    const pattern = /^[a-z0-9][a-z0-9\-_]{4,19}$/;
    if (!pattern.test($idInput.value)) {
      setIsIdProper(false);
      return;
    }
    // TODO: id 중복 확인
    setIsIdProper(true);
  };

  const onPasswordChanged = event => {
    event.preventDefault();
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[~`!@#$%^&*()\-_=+{}\[\]\\|:;'",<.>/?]).{8,16}$/;
    if (!pattern.test($passwordInput.value)) {
      setIsPasswordProper(false);
      return;
    }
    setIsPasswordProper(true);
  };

  const onSubmitButtonClicked = async event => {
    event.preventDefault();
    const id = $idInput.value;
    const password = $passwordInput.value;
    const user = { id, password };
    const signUpURL = '/api/auth/signup';
    try {
      const response = await fetch(signUpURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
        // TODO: 에러 처리 제대로 하기
        throw new Error(data.message);
      }
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const setIsIdProper = value => {
    isIdProper = value;
    handleSubmitbuttonActivation();
    handleIdInputError();
    // TODO: id 형식 안내 메시지 띄우기
  };

  const setIsPasswordProper = value => {
    isPasswordProper = value;
    handleSubmitbuttonActivation();
    handlePasswordInputError();
    // TODO: password 형식 안내 메시지 띄우기
  };

  const handleSubmitbuttonActivation = () => {
    $submitButton.disabled = !(isIdProper && isPasswordProper);
  };

  const handleIdInputError = () => {
    const idLabelErrorClassName = 'sign-up-form__label--error';
    const idInputErrorClassName = 'sign-up-form__input--error';
    const idLabelClasses = $idLabel.className.split(' ');
    const idInputClasses = $idInput.className.split(' ');
    if (isIdProper) {
      $idLabel.className = idLabelClasses
        .filter(className => className != idLabelErrorClassName)
        .join(' ');
      $idInput.className = idInputClasses
        .filter(className => className != idInputErrorClassName)
        .join(' ');
    } else {
      $idLabel.className = !idLabelClasses.includes(idLabelErrorClassName)
        ? [...idLabelClasses, idLabelErrorClassName].join(' ')
        : $idLabel.className;
      $idInput.className = !idInputClasses.includes(idInputErrorClassName)
        ? [...idInputClasses, idInputErrorClassName].join(' ')
        : $idInput.className;
    }
  };

  const handlePasswordInputError = () => {
    const passwordLabelErrorClassName = 'sign-up-form__label--error';
    const passwordInputErrorClassName = 'sign-up-form__input--error';
    const passwordLabelClasses = $passwordLabel.className.split(' ');
    const passwordInputClasses = $passwordInput.className.split(' ');
    if (isPasswordProper) {
      $passwordLabel.className = passwordLabelClasses
        .filter(className => className != passwordLabelErrorClassName)
        .join(' ');
      $passwordInput.className = passwordInputClasses
        .filter(className => className != passwordInputErrorClassName)
        .join(' ');
    } else {
      $passwordLabel.className = !passwordLabelClasses.includes(
        passwordLabelErrorClassName,
      )
        ? [...passwordLabelClasses, passwordLabelErrorClassName].join(' ')
        : $passwordLabel.className;
      $passwordInput.className = !passwordInputClasses.includes(
        passwordInputErrorClassName,
      )
        ? [...passwordInputClasses, passwordInputErrorClassName].join(' ')
        : $passwordInput.className;
    }
  };

  $signUpForm.className = 'sign-up-form';
  $signUpForm.setAttribute('autocomplete', 'off');

  $idBox.className = 'box--column';

  $passwordBox.className = 'box--column';

  $idLabel.className = 'sign-up-form__label';
  $idLabel.innerHTML = 'Id';
  $idLabel.htmlFor = 'id';

  $idInput.className = 'sign-up-form__input sign-up-form__input--mt';
  $idInput.setAttribute('type', 'text');
  $idInput.id = 'id';
  $idInput.addEventListener('input', debounce(onIdChanged, idInputWaitingTime));

  $passwordLabel.className = 'sign-up-form__label';
  $passwordLabel.innerHTML = 'Password';
  $passwordLabel.htmlFor = 'password';

  $passwordInput.className = 'sign-up-form__input sign-up-form__input--mt';
  $passwordInput.setAttribute('type', 'password');
  $passwordInput.id = 'password';
  $passwordInput.addEventListener(
    'input',
    debounce(onPasswordChanged, passwordInputWaitingTime),
  );

  $submitButton.className =
    'sign-up-form__submit-button sign-up-form__submit-button--mt';
  $submitButton.innerHTML = 'Create account';
  $submitButton.disabled = true;
  $submitButton.addEventListener('click', onSubmitButtonClicked);

  $idBox.appendChild($idLabel);
  $idBox.appendChild($idInput);

  $passwordBox.appendChild($passwordLabel);
  $passwordBox.appendChild($passwordInput);

  $signUpForm.appendChild($idBox);
  $signUpForm.appendChild($passwordBox);
  $signUpForm.appendChild($submitButton);

  return $signUpForm;
}

export default SignUpForm;
