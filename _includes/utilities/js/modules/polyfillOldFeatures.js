import arrayFrom from 'array.from';
import promisePolyfill from 'promise-polyfill';
import findIndex from 'array.prototype.findindex';


function polyfillOldFeatures() {
  if (!window.Array.findIndex) {
    findIndex.shim();
  }

  if (!window.Array.from) {
    window.Array.from = arrayFrom;
  }

  if (!window.Promise) {
    window.Promise = promisePolyfill;
  }
}


export default polyfillOldFeatures();
