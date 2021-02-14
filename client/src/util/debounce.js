function debounce(func, wait, leading = false) {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;

    const callNow = leading && !inDebounce;

    const later = () => {
      inDebounce = null;
      if (!leading) func.apply(context, args);
    };

    clearTimeout(inDebounce);
    inDebounce = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

export default debounce;
