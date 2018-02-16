import { h, render } from 'preact';
import RevenueMarkup from './partials/RevenueMarkup.jsx';


function Revenue() {
  const componentsList = document.getElementsByClassName('Revenue-container');

  if (componentsList.length > 0) {
    for (let i = 0; i < componentsList.length; i++) {
      const component = componentsList[i];
      const rawItems = JSON.parse(component.getAttribute('data-info')).data;
      const link = component.getAttribute('data-link');
      const year = component.getAttribute('data-year') || '2017-18';

      console.log(year);

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
        <RevenueMarkup {...{ items, link, year }} />,
        component,
      );
    }
  }
}


export default Revenue();
