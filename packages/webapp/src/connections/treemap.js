import { createElement } from 'react';
import { render } from 'react-dom';
import TreemapSection from '../components/TreemapSection';

const node = document.querySelector('[data-webapp="national-departments-treemap"]');
const dataString = document.querySelector('[data-webapp-departments]').dataset.webappDepartments;
console.log(dataString);
const pageData = JSON.parse(dataString);
const amounts = pageData.expenditure.national;
const originalBudget = amounts.filter(function(amount) {
  return amount.budget_phase == "Main Appropriation";
});


console.log(originalBudget);

const connection = () => {
  if (node) {
    return render(
        createElement(TreemapSection, { departments: amounts, isNationalBudget: true }),
        node
    )
  }
};

export default connection();
