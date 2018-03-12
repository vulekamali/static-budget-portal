import { h, render } from 'preact';
import ProgrammesChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-programmesChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];

    const values = JSON.parse(decodeHtmlEntities(component.getAttribute('data-values'))).data;
    const year = component.getAttribute('data-year');

    const items = values.reduce(
      (results, val) => {
        return {
          ...results,
          [val.name]: [val.total_budget],
        };
      },
      {},
    );

    render(
      <ProgrammesChart {...{ items, year }} />,
      component,
    );
  }
}


export default scripts();
