import Header from './components/Header';

function App() {
  const app = document.createElement('div');
  app.className = 'app';

  app.appendChild(Header());

  return app;
}

export default App;
