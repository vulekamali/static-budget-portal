import { h, render } from 'preact';
import YearSelectContainer from './partials/YearSelectContainer.jsx';


function YearSelect() {
  const nodes = document.getElementsByClassName('YearSelect');
  const nodesArray = [...nodes];
  const { search, no_js: noJs } = window.budgetPortal.stringQueries;

  if (nodesArray.length > 0 && !noJs) {
    nodesArray.forEach((node, i) => {
      const jsonData = JSON.parse(nodes[i].getAttribute('data-json')).data;
      const jsonDynamicRaw = JSON.parse(nodes[i].getAttribute('data-dynamic'));
      const jsonDynamic = jsonDynamicRaw ? jsonDynamicRaw.data : null;

      render(
        <YearSelectContainer {...{ jsonData, search, jsonDynamic }} />,
        nodes[i].parentNode,
        nodes[i],
      );
    });
  }
}


export default YearSelect();
