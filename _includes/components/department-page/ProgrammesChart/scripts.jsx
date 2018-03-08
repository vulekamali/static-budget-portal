import { h, render } from 'preact';
import ProgrammesChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-programmesChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];

    const values = JSON.parse(decodeHtmlEntities(component.getAttribute('data-values'))).data;

    render(
      <ProgrammesChart {...{ values }} />,
      component,
    );
  }
}


export default scripts();
