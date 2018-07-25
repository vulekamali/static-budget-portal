import { initialize, pageview, event } from 'react-ga';


function loadGoogleAnalytics() {
  initialize('UA-93649482-8');
  pageview(window.location.pathname);

  const { search_type: searchType, search_string: searchString } = window.vulekamali.qs;

  if (searchType && searchString) {
    event({
      category: 'search',
      action: searchType,
      label: searchString,
    });
  }

  return null;
}


export default loadGoogleAnalytics();
