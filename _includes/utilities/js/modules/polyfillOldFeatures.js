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

  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }
}


export default polyfillOldFeatures();
