function setCookie(key, value, day = 1) {
  const date = new Date();
  date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
  document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(key) {
  const value = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
  return value ? value[2] : null;
}

export default { setCookie, getCookie };
