import { h, render } from 'preact';
import GraphContainer from './partials/GraphContainer.jsx';


const componentList = document.getElementsByClassName('Graph');

for (let i = 0; i < componentList.length; i++) {
  const component = componentList[i];
  const items = JSON.parse(component.getAttribute('data-graph'));
  const legendAttribute = component.getAttribute('data-config') || '{ "legend": [] }';
  const { legend } = JSON.parse(legendAttribute);

  render(
    <GraphContainer {...{ items, legend }} />,
    component,
  );
}
