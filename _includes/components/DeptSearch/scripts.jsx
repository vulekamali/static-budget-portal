import { h, render } from 'preact';
import DeptSearchContainer from './partials/DeptSearchContainer.jsx';


function DeptSearch() {
  const nodes = document.getElementsByClassName('DeptSearch');
  const nodesArray = [...nodes];

  if (nodesArray.length > 0) {
    nodesArray.forEach((node) => {
      const jsonData = JSON.parse(node.getAttribute('data-json')).data;
      render(<DeptSearchContainer {...{ jsonData }} />, node.parentNode, node);
    });
  }
}


export default DeptSearch();
