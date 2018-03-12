import { h, render } from 'preact';
import BarChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-chart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];
    const items = JSON.parse(decodeHtmlEntities(component.getAttribute('data-values')));
    const guides = component.getAttribute('data-guides') !== null;
    const hover = component.getAttribute('data-hover') !== null;
    const width = parseInt(component.getAttribute('data-width'), 10);

    render(
      <BarChart {...{ items, width, hover, guides }} />,
      component,
    );
  }
}


export default scripts();
