import DebounceFunction from '../../../utilities/js/helpers/DebounceFunction.js';


function ArrowButtons() {
  const node = document.querySelector('[data-sticky-arrows]');
  const clickNodes = document.querySelectorAll('[data-scroll-smooth]');

  const clickOverride = (event, target) => {
    event.preventDefault();
    const targetNode = document.querySelector(target);

    targetNode.scrollIntoView({
      behavior: 'smooth',
    });
  };

  if (Array.from) {
    Array.from(clickNodes).forEach((innerNode) => {
      const target = innerNode.getAttribute('data-scroll-smooth');

      if (target) {
        innerNode.addEventListener(
          'click',
          event => clickOverride(event, target),
        );
      }
    });
  }

  const updateSticky = () => {
    if (node) {
      const active = node.classList.contains('is-active');
      const top = window.pageYOffset || document.documentElement.scrollTop;

      if (top < 400 && active) {
        return node.classList.remove('is-active');
      }

      if (top > 400 && !active) {
        return node.classList.add('is-active');
      }
    }

    return null;
  };

  const viewportDebounce = new DebounceFunction(50);
  const updateViewport = () => viewportDebounce.update(updateSticky);

  window.addEventListener(
    'resize',
    updateViewport,
  );

  window.addEventListener(
    'scroll',
    updateViewport,
  );
}


export default ArrowButtons();
