import { createElement } from 'react';
import { render } from 'react-dom';
import TreemapSection from '../components/TreemapSection';

const node = document.querySelector('[data-webapp="national-departments-treemap"]');
const dataString = document.querySelector('[data-webapp-departments]').dataset.webappDepartments;
const spendingData = JSON.parse(dataString);

const connection = () => {
  if (node) {
    return render(
        createElement(TreemapSection, { spendingData: spendingData, isNationalBudget: true }),
        node
    )
  }
};

export default connection();
