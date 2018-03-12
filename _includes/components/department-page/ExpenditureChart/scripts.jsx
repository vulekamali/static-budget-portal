import { h, render } from 'preact';
import ExpenditureChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-expenditureChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];

    const values = JSON.parse(decodeHtmlEntities(component.getAttribute('data-values'))).data;

    render(
      <ExpenditureChart {...{ values }} />,
      component,
    );
  }
}


export default scripts();
