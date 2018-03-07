import { h, render } from 'preact';
import HomeChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-deptChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];

    const values = JSON.parse(decodeHtmlEntities(component.getAttribute('data-values'))).data;

    render(
      <HomeChart {...{ values }} />,
      component,
    );
  }
}


export default scripts();
