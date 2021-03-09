import userStore from './store/userStore';

import MainPage from './pages/MainPage';
import SignInPage from './pages/SignInPage';

class App {
  render() {
    const { user } = userStore.getState();
    if (user) {
      const mainPage = new MainPage();
      return mainPage.render();
    }

    const signInPage = new SignInPage();
    return signInPage.render();
  }
}

export default App;
