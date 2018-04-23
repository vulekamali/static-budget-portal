import analyticsEvent from './../helpers/analyticsEvent.js';
import getProps from './../helpers/getProp.js';


function loadGoogleAnalytics() {
  /* eslint-disable */
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  if ('addEventListener' in window) {
    window.addEventListener('error', function(e) {
      if (typeof window.ga === 'function') {
        window.ga('send', 'exception', {
          'exDescription': e.message + ' @ ' + e.filename + ': ' + e.lineno,
          'exFatal': true,
        });
      }
    });
  }
  /* eslint-enable */

  const { search_type: searchType, search_string: searchString } = window.vulekamali.qs;

  analyticsEvent('create', 'UA-93649482-8', 'auto');
  analyticsEvent('send', 'pageview');

  if (searchType && searchString) {
    analyticsEvent('send', 'event', 'search', searchType, searchString);
  }
}

const production = getProps('production', document.body, 'bool');
export default production ? loadGoogleAnalytics() : null;
