import MainPage from './pages/MainPage';

function App() {
  const app = document.createElement('div');
  app.className = 'app';

  app.appendChild(MainPage());

  return app;
}

export default App;
