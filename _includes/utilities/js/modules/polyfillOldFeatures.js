import arrayFrom from 'array.from';
import promisePolyfill from 'promise-polyfill';


function polyfillOldFeatures() {
  if (!window.Array.from) {
    window.Array.from = arrayFrom;
  }

  if (!window.Promise) {
    window.Promise = promisePolyfill;
  }
}


export default polyfillOldFeatures();
