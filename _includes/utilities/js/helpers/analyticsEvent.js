export default function analyticsEvent(...args) {
  return window.gtag(args);
}
