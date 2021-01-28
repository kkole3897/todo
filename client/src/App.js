import Header from './components/Header';
import Board from './components/Board';

function App() {
  const app = document.createElement('div');
  app.className = 'app';

  const $sectionBoard = document.createElement('section');
  $sectionBoard.className = 'section__board';

  const $todo = Board({ title: '해야할일' });
  const $progress = Board({ title: '하는중' });
  const $complete = Board({ title: '완료' });

  $sectionBoard.appendChild($todo);
  $sectionBoard.appendChild($progress);
  $sectionBoard.appendChild($complete);

  app.appendChild(Header());
  app.appendChild($sectionBoard);

  return app;
}

export default App;
