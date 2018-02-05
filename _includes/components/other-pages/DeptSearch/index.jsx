import { h, render } from 'preact';
import DeptSearchContainer from './partials/DeptSearchContainer.jsx';


function DeptSearch() {
  const componentsList = document.getElementsByClassName('DeptSearch');

  if (componentsList.length > 0) {
    for (let i = 0; i < componentsList.length; i++) {
      const component = componentsList[i];
      const { spheres, no_js: noJs } = window.budgetPortal.stringQueries;

      const nationalData = JSON.parse(component.getAttribute('data-national-json')).data;
      const provincialData = JSON.parse(component.getAttribute('data-provincial-json')).data;

      const jsonData = [
        {
          ...nationalData,
          name: 'National',
        },
        ...provincialData,
      ];

      if (!noJs) {
        render(
          <DeptSearchContainer {...{ jsonData, spheres }} />, 
          component.parentNode,
          component,
        );
      }
    }
  }
}


export default DeptSearch();

