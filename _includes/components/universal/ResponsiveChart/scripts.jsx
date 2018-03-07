import { h, render } from 'preact';
import ResponsiveChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-responsiveChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];
    const items = JSON.parse(decodeHtmlEntities(component.getAttribute('data-values')));
    const downloadable = component.getAttribute('data-downloadable') !== null;
    const max = component.getAttribute('data-max');
    const offset = component.getAttribute('data-offset');

    render(
      <ResponsiveChart {...{ items, downloadable, max, offset }} />,
      component,
    );
  }
}


export default scripts();
