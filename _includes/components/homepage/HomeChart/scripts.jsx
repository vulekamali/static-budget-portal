import { h, render } from 'preact';
import HomeChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-initHomeChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];

    const values = JSON.parse(decodeHtmlEntities(component.getAttribute('data-values'))).data;
    const year = component.getAttribute('data-year');

    render(
      <HomeChart {...{ values, year }} />,
      component,
    );
  }
}


export default scripts();
