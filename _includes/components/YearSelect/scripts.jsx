import { h, render } from 'preact';
import YearSelectContainer from './partials/YearSelectContainer.jsx';


function YearSelect() {
  const nodes = document.getElementsByClassName('YearSelect');
  const nodesArray = [...nodes];
  const { search } = window.budgetPortal.stringQueries;

  nodesArray.forEach((node, i) => {
    const jsonData = JSON.parse(nodes[i].getAttribute('data-json')).data;

    render(
      <YearSelectContainer {...{ jsonData, search }} />,
      nodes[i],
    );
  });
}


export default YearSelect();
