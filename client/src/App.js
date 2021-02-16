import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { cookie } from './util';

function App() {
  const route = {
    '/': MainPage(),
    '/signin': SignInPage(),
    '/signup': SignUpPage(),
  };

  if (
    window.location.pathname === '/' &&
    (!cookie.getCookie('logged_in') || cookie.getCookie('logged_in') !== 'yes')
  ) {
    window.history.pushState('signin', null, '/signin');
    return route['/signin'];
  }

  return route[window.location.pathname];
}

export default App;
