import SignInForm from '../components/SignInForm';

function SignInPage() {
  const $signInPage = document.createElement('article');
  const $signInForm = SignInForm();

  $signInPage.appendChild($signInForm);

  return $signInPage;
}

export default SignInPage;
