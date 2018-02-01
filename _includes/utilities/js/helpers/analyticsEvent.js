export default function analyticsEvent(...args) {
  try {
    return window.ga(...args);
  } catch (err) {
    console.log(err);
  }
}
