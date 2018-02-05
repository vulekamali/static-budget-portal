import { h, render } from 'preact';
import SearchResultContainer from './partials/SearchResultContainer.jsx';


function SearchResult() {
  const nodes = document.getElementsByClassName('SearchResult');
  const nodesArray = [...nodes];
  const { search } = window.budgetPortal.stringQueries;

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      const selectedYear = node.getAttribute('data-year');
      render(<SearchResultContainer {...{ selectedYear, search }} />, node);
    });
  }
}


export default SearchResult();
