import { createElement } from 'react';
import { render } from 'react-dom';
import TreemapSection from '../components/TreemapSection';

const node = document.querySelector('[data-webapp="national-departments-treemap"]');
const dataString = document.querySelector('[data-webapp-national-departments]').dataset.webappNationalDepartments;
const spendingData = JSON.parse(dataString);
console.log(spendingData);

const connection = () => {
  if (node) {
    render(
        createElement(TreemapSection, { spendingData: spendingData, isNationalBudget: true }),
        node
    )
  }
};

export default connection();
