import { h, render } from 'preact';
import ExpenditureChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-expenditureChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];

    const real = JSON.parse(decodeHtmlEntities(component.getAttribute('data-real'))).data;
    const nominal = JSON.parse(decodeHtmlEntities(component.getAttribute('data-nominal'))).data;

    const normalise = (source) => {
      return source.reduce(
        (results, val) => {
          if (val.amount) {
            return {
              ...results,
              [val.financial_year]: [val.amount],
            };
          }

          return results;
        },
        {},
      );
    };

    const items = {
      'Adjusted for inflation': normalise(real),
      'Not adjusted for inflation': normalise(nominal),
    };


    console.log(items)


    render(
      <ExpenditureChart {...{ items }} />,
      component,
    );
  }
}


export default scripts();
