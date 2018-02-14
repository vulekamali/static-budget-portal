import { h, render } from 'preact';
import ExpenditureMarkup from './partials/ExpenditureMarkup.jsx';


function Expenditure() {
  const componentsList = document.getElementsByClassName('Expenditure-data');

  if (componentsList.length > 0) {
    for (let i = 0; i < componentsList.length; i++) {
      const component = componentsList[i];
      const rawItems = JSON.parse(component.getAttribute('data-info')).data;
      const year = component.getAttribute('data-year') || '2017-18';

      const items = rawItems.reduce(
        (results, val) => {
          return {
            ...results,
            [val.name]: [val.total_budget],
          };
        },
        {},
      );

      render(
        <ExpenditureMarkup {...{ items, year }} />,
        component,
      );
    }
  }
}


export default Expenditure();
