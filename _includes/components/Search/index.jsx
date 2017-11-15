import { h, render } from 'preact';
import SearchContainer from './partials/SearchContainer.jsx';


function Search() {
  const nodes = document.getElementsByClassName('Search');
  const nodesArray = [...nodes];

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      render(<SearchContainer />, node);
    });
  }
}


export default Search();
