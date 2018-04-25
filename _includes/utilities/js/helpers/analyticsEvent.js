import getProps from './../helpers/getProp.js';


export default function analyticsEvent(...args) {
  const production = getProps('production', document.body, 'bool');
  return production ? window.ga(...args) : null;
}
