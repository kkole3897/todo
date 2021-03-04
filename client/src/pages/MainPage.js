import Header from '../components/Header';
import BoardContainer from '../components/BoardContainer';

function MainPage() {
  const $mainPage = document.createElement('article');

  const $boardContainer = BoardContainer();

  $mainPage.appendChild(Header());
  $mainPage.appendChild($boardContainer);

  return $mainPage;
}

export default MainPage;
