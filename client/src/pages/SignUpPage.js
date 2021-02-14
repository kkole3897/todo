import SignUpForm from '../components/SignUpForm';

function SignUpPage() {
  const $signUpPage = document.createElement('article');

  const $signUpForm = SignUpForm();

  $signUpPage.append($signUpForm);

  return $signUpPage;
}

export default SignUpPage;
