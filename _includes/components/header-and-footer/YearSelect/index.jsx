import { h, render } from 'preact';
import YearSelectContainer from './partials/YearSelectContainer.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function YearSelect() {
  const nodes = document.getElementsByClassName('YearSelect');
  const nodesArray = [...nodes];
  const { search, no_js: noJs } = window.budgetPortal.stringQueries;

  if (nodesArray.length > 0 && !noJs) {
    nodesArray.forEach((node, i) => {
      const jsonData = JSON.parse(decodeHtmlEntities(nodes[i].getAttribute('data-json'))).data;

      render(
        <YearSelectContainer {...{ jsonData, search }} />,
        nodes[i].parentNode,
        nodes[i],
      );
    });
  }
}


export default YearSelect();
