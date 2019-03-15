import { createElement } from 'react';
import { render } from 'react-dom';
import TreeMap from '../components/Treemap';
import data from '../components/Treemap/data/test'

// const decodeHtmlEntities = (input) => {
//   let element = document.createElement('div');
//   element.innerHTML = input;
//   return element.childNodes.length === 0 ? '' : element.childNodes[0].nodeValue;
// }

// const parseDepartments = department => ({
//   id: department.slug,
//   name: department.name,
//   amount: department.amount,
//   budget_phase: department.budget_phase,
//   financial_year: department.financial_year,
//   area_percentage: department.area_percentage,
//   detail: department.detail,
// });


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
        createElement(TreeMap, { departments: data }),
        node
    )
  }
};

export default connection();
