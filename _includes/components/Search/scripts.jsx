import { h, render } from 'preact';
import queryString from 'query-string';
import SearchContainer from './partials/SearchContainer.jsx';


function Search() {
  const nodes = document.getElementsByClassName('Search');
  const nodesArray = [...nodes];
  const { search } = queryString.parse(location.search) || {};

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      const selectedYear = node.getAttribute('data-year');
      render(<SearchContainer {...{ selectedYear, search }} />, node);
    });
  }
}


export default Search();
