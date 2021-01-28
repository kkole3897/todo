import './Header.css';

function Header() {
  const $header = document.createElement('header');
  $header.className = 'header';

  const $headerInner = document.createElement('div');
  $headerInner.className = 'header__inner';

  const $headerLogo = document.createElement('div');
  $headerLogo.className = 'header__logo';
  $headerLogo.innerHTML = 'TODO 서비스';
  $headerLogo.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
  });

  const $headerMenu = document.createElement('div');
  $headerMenu.className = 'header__menu';
  $headerMenu.innerHTML = 'menu';

  $headerInner.appendChild($headerLogo);
  $headerInner.appendChild($headerMenu);
  $header.appendChild($headerInner);

  return $header;
}

export default Header;
