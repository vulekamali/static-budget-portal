import { h, render } from 'preact';
import Toggle from './partials/Toggle.jsx';


const componentList = document.getElementsByClassName('Graph-data');

for (let i = 0; i < componentList.length; i++) {
  const component = componentList[i];
  const { data } = JSON.parse(component.getAttribute('data-graph'));
  const legendAttribute = component.getAttribute('data-config') || '{ "legend": [] }';
  const { legend } = JSON.parse(legendAttribute);
  const year = component.getAttribute('data-year');


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
    <Toggle {...{ items, year, legend }} />,
    component,
  );
}
