import { h, render } from 'preact';
import ResponsiveChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-responsiveChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];
    const charts = JSON.parse(decodeHtmlEntities(component.getAttribute('data-charts')));
    const downloadable = component.getAttribute('data-downloadable') !== null;
    const columns = component.getAttribute('data-columns');
    const max = component.getAttribute('data-max');
    const offset = component.getAttribute('data-offset');
    const name = component.getAttribute('data-name');

    render(
      <ResponsiveChart {...{ name, charts, downloadable, max, offset, columns }} />,
      component,
    );
  }
}


export default scripts();
