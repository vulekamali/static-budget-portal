export default function analyticsEvent(...args) {
  return window.dataLayer.push(args);
}
