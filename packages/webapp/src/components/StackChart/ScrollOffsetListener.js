import { debounce } from 'lodash';

class ScrollOffsetListener {
  constructor(callback, delay = 100) {
    this.callback = callback;
    // this.debouncedScroll = debounce(this.onScroll, delay);
    window.addEventListener('scroll', this.onScroll, false);
  }

  stop = () => {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    return this.callback(window.scrollY);
  }
}


export default ScrollOffsetListener;