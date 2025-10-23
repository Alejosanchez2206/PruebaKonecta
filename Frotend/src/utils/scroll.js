export function setHiddenScrollbar(element, hide = true) {
  if (!element) return;
  if (hide) {
    element.classList.add('hide-scroll');
  } else {
    element.classList.remove('hide-scroll');
  }
}
