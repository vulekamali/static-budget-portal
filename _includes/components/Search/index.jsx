import { h, render } from 'preact';
import queryString from 'query-string';
import SearchContainer from './partials/SearchContainer.jsx';


function Search() {
  // Find all instances of a specific UI component on a page by parent class name.
  const nodes = document.getElementsByClassName('Search');

  // Destructure needed query strings from URL
  const { search: searchParam, no_js: noJs } = queryString.parse(location.search) || {};

  if (nodes.length > 0 && !noJs) {
    for (let i = 0; i < nodes.length; i++) {
      // Find DOM node that will house the Preact app and get associated data attributes that are passed via HTML
      const wrapperDomNode = nodes[i].getElementsByClassName('Search-function')[0];
      const selectedYear = wrapperDomNode.getAttribute('data-year');

      // Initialise Search Preact App
      render(
        <SearchContainer
          selectedYear={selectedYear}
          searchParam={searchParam}
        />,
        wrapperDomNode.parentNode,
        wrapperDomNode,
      );
    }
  }
}


export default Search();
