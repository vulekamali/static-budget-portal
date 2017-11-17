import { h, render } from 'preact';
import SearchContainer from './partials/SearchContainer.jsx';


function Search() {
  const nodes = document.getElementsByClassName('Search');
  const nodesArray = [...nodes];

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      const selectedYear = node.getAttribute('data-year');
      render(<SearchContainer {...{ selectedYear }} />, node);
    });
  }
}


export default Search();
