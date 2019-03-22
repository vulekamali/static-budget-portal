import { createElement } from 'react';
import { render } from 'react-dom';
import TreemapSection from '../components/TreemapSection';

const node = document.querySelector('[data-webapp="provincial-departments-treemap"]');
const dataString = document.querySelector('[data-webapp-provincial-departments]').dataset.webappProvincialDepartments;
const spendingData = JSON.parse(dataString);

const connection = () => {
  if (node) {
    render(
        createElement(TreemapSection, { spendingData: null, isNationalBudget: false }),
        node
    )
  }
};

export default connection();
