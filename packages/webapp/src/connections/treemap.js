import { createElement } from 'react';
import { render } from 'react-dom';
import TreemapSection from '../components/TreemapSection';
import data from '../components/TreemapSection/Treemap/data/test'

const node = document.querySelector('[data-webapp="national-departments-treemap"]');
const dataString = document.querySelector('[data-webapp-departments]').dataset.webappDepartments;
console.log(dataString);
const pageData = JSON.parse(dataString);
console.log(pageData);
// const departments = pageData['data']['national'].map(parseDepartments);
// console.log(departments);

const connection = () => {
  if (node) {
    return render(
        createElement(TreemapSection, { departments: data, isNationalBudget: true }),
        node
    )
  }
};

export default connection();
