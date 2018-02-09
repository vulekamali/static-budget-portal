export default class BreakpointListener {
  constructor(debounce, breakpointFunctions) {
    this.debounce = debounce;
    this.resizeTimeout = null;
    this.currentViewport = null;
    this.breakpointFunctions = breakpointFunctions;
  }


  update() {
    const viewport = window.innerWidth;
    const breakpoints = Object.keys(this.breakpointFunctions);

    const calcViewport = () => {
      for (let i = 0; i < breakpoints.length; i++) {
        if (viewport < parseInt(breakpoints[i], 10)) {
          return breakpoints[i];
        }
      }

      return breakpoints[breakpoints.length - 1];
    };

    const calcViewportValue = calcViewport();
    if (calcViewportValue !== this.currentViewport) {
      this.currentViewport = calcViewportValue;
      return this.breakpointFunctions[calcViewportValue]();
    }

    return null;
  }


  updateDebounce() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    const updateWrap = () => this.update();
    this.resizeTimeout = setTimeout(updateWrap, this.debounce);
  }
}
