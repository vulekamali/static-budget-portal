import { h, render } from 'preact';
import RevenueMarkup from './partials/RevenueMarkup.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function Revenue() {
  const componentsList = document.getElementsByClassName('Revenue-container');

  if (componentsList.length > 0) {
    for (let i = 0; i < componentsList.length; i++) {
      const component = componentsList[i];
      const rawItems = JSON.parse(decodeHtmlEntities(component.getAttribute('data-info'))).data;
      const link = component.getAttribute('data-link');
      const year = component.getAttribute('data-year');
      const shortcuts = component.getAttribute('data-shortcuts') === 'true';

      const items = rawItems.reduce(
        (results, val) => {
          return {
            ...results,
            [val.category]: val.amount,
          };
        },
        {},
      );

      render(
        <RevenueMarkup {...{ items, link, year, shortcuts }} />,
        component,
      );
    }
  }
}


export default Revenue();
