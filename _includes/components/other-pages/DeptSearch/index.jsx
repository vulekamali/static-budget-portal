import { h, render } from 'preact';
import DeptSearchContainer from './partials/DeptSearchContainer.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function DeptSearch() {
  const componentsList = document.getElementsByClassName('DeptSearch');

  if (componentsList.length > 0) {
    for (let i = 0; i < componentsList.length; i++) {
      const component = componentsList[i];
      const { sphere, no_js: noJs } = window.budgetPortal.stringQueries;

      const nationalData = JSON.parse(decodeHtmlEntities(component.getAttribute('data-national-json'))).data;
      const rawProvincialData = JSON.parse(decodeHtmlEntities(component.getAttribute('data-provincial-json'))).data;

      const provincialData = rawProvincialData.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      const jsonData = [
        {
          ...nationalData,
          name: 'National',
        },
        ...provincialData,
      ];

      if (!noJs) {
        render(
          <DeptSearchContainer {...{ jsonData, sphere }} />,
          component.parentNode,
          component,
        );
      }
    }
  }
}


export default DeptSearch();

