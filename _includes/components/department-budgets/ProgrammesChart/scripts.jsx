import { h, render } from 'preact';
import ProgrammesChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';


function scripts() {
  const componentList = document.getElementsByClassName('js-initProgrammesChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];

    const values = JSON.parse(decodeHtmlEntities(component.getAttribute('data-values'))).data;
    const rawFiles = JSON.parse(decodeHtmlEntities(component.getAttribute('data-files')));
    const year = component.getAttribute('data-year');

    const items = values.reduce(
      (results, val) => {
        return {
          ...results,
          [val.name]: [val.total_budget],
        };
      },
      {},
    );

    const files = Object.keys(rawFiles).reduce(
      (results, key) => {
        const object = rawFiles[key].formats.reduce(
          (innerResults, val) => {
            return {
              ...innerResults,
              [`${key} (${val.format})`]: val.url,
            };
          },
          {},
        );

        return {
          ...results,
          ...object,
        };
      },
      {},
    );

    render(
      <ProgrammesChart {...{ items, year, files }} />,
      component,
    );
  }
}


export default scripts();
