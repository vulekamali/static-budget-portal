import { h, render } from 'preact';
import queryString from 'query-string';
import SearchContainer from './partials/SearchContainer.jsx';


function Search() {
  // Find all instances of a specific UI component on a page by parent class name.
  const componentsList = document.getElementsByClassName('Search');

  // Destructure needed query strings from URL
  const { search: searchParam, no_js: noJs } = queryString.parse(location.search) || {};

  if (componentsList.length > 0 && !noJs) {
    for (let i = 0; i < componentsList.length; i++) {
      // Find DOM node that will house the Preact app and get associated data attributes that are passed via HTML
      const component = componentsList[i];
      const requestOverride = component.getAttribute('data-request-override');
      const selectedYear = component.getAttribute('data-year') || '2018-19';

      // Initialise Search Preact App
      render(
        <SearchContainer {...{ requestOverride, selectedYear, searchParam }} />,
        component.parentNode,
        component,
      );
    }
  }
}


export default Search();
