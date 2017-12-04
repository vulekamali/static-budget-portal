export default function analyticsEvent(...args) {
  console.log(...args);
  return window.ga(...args);
}
