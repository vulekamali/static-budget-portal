import { createElement } from 'react';
import { render } from 'react-dom';
import TreemapSection from '../components/TreemapSection';

const node = document.querySelector('[data-webapp="national-departments-treemap"]');
const dataString = document.querySelector('[data-webapp-departments]').dataset.webappDepartments;
console.log(dataString);
const pageData = JSON.parse(dataString);
const amounts = pageData.expenditure.national;
const originalBudget = amounts.filter(function(amount) {
  return amount.budget_phase == "Main appropriation";
});
const sorted = originalBudget.sort((a, b) => b.amount - a.amount);
const biggest = sorted.slice(0, 10);

console.log(originalBudget);

const connection = () => {
  if (node) {
    return render(
        createElement(TreemapSection, { departments: biggest, isNationalBudget: true }),
        node
    )
  }
};

export default connection();
