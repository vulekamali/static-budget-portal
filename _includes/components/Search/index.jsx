import { h, render } from 'preact';
import queryString from 'query-string';
import SearchContainer from './partials/SearchContainer.jsx';


function Search() {
  const nodes = document.getElementsByClassName('Search');
  const nodesArray = [...nodes];
  const { search, no_js: noJs } = queryString.parse(location.search) || {};

  if (nodesArray.length > 0 && !noJs) {
    nodesArray.forEach((node) => {
      const nestedNode = node.getElementsByClassName('Search-function')[0];
      const selectedYear = nestedNode.getAttribute('data-year');
      render(<SearchContainer {...{ selectedYear, search }} />, nestedNode.parentNode, nestedNode);
    });
  }
}


export default Search();
