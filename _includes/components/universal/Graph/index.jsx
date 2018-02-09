import { h, render } from 'preact';
import GraphContainer from './partials/GraphContainer.jsx';


const componentList = document.getElementsByClassName('Graph');

for (let i = 0; i < componentList.length; i++) {
  const component = componentList[i];
  const { data } = JSON.parse(component.getAttribute('data-graph'));
  const legendAttribute = component.getAttribute('data-config') || '{ "legend": [] }';
  const { legend } = JSON.parse(legendAttribute);

  const items = data.reduce(
    (result, val) => {
      return {
        ...result,
        [val.name]: [JSON.parse(val.total_budget)],
      };
    },
    {},
  );

  render(
    <GraphContainer {...{ items, legend }} />,
    component,
  );
}
