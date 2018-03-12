import { h, render } from 'preact';
import ResponsiveChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-responsiveChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];
    const charts = JSON.parse(decodeHtmlEntities(component.getAttribute('data-charts')));
    const columns = component.getAttribute('data-columns');
    const name = component.getAttribute('data-name');

    render(
      <ResponsiveChart {...{ name, charts, columns }} />,
      component,
    );
  }
}


export default scripts();
