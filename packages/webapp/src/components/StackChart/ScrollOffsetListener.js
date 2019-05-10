import { debounce } from 'lodash';

class ScrollOffsetListener {
  constructor(callback, delay = 100) {
    this.callback = callback;
    this.debouncedScroll = debounce(this.onScroll, delay);
    window.addEventListener('scroll', this.debouncedScroll, false);
  }

  stop = () => {
    window.removeEventListener('scroll', this.debouncedScroll, false);
  }

  onScroll = () => {
    return this.callback(window.scrollY);
  }
}


export default ScrollOffsetListener;