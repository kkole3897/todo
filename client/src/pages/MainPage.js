import Header from '../components/Header';
import BoardContainer from '../components/BoardContainer';

function MainPage() {
  function render() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(Header());
    fragment.appendChild(BoardContainer());

    return fragment;
  }

  return render();
}

export default MainPage;
