import { h, render } from 'preact';
import DeptSearchContainer from './partials/DeptSearchContainer.jsx';


function DeptSearch() {
  const nodes = document.getElementsByClassName('DeptSearch');
  const nodesArray = [...nodes];
  const { spheres, no_js: noJs } = window.budgetPortal.stringQueries;

  if (nodesArray.length > 0 && !noJs) {
    nodesArray.forEach((node) => {
      const nationalData = JSON.parse(node.getAttribute('data-national-json')).data;
      const provincialData = JSON.parse(node.getAttribute('data-provincial-json')).data;

      const jsonData = [
        {
          ...nationalData,
          name: 'National',
        },
        ...provincialData,
      ];
      render(<DeptSearchContainer {...{ jsonData, spheres }} />, node.parentNode, node);
    });
  }
}


export default DeptSearch();
