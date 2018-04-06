import analyticsEvent from './../helpers/analyticsEvent.js';


function loadGoogleAnalytics() {
  const { search_type: searchType, search_string: searchString } = window.vulekamali.qs;

  analyticsEvent('create', 'UA-93649482-8', 'auto');
  analyticsEvent('send', 'pageview');

  if (searchType && searchString) {
    analyticsEvent('send', 'event', 'search', searchType, searchString);
  }
}


export default loadGoogleAnalytics();
