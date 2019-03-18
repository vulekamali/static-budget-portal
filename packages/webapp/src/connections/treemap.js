import { createElement } from 'react';
import { render } from 'react-dom';
import TreemapSection from '../components/TreemapSection';
import { colorArray } from '../components/TreemapSection/Treemap/data/colors'

const node = document.querySelector('[data-webapp="national-departments-treemap"]');
const dataString = document.querySelector('[data-webapp-departments]').dataset.webappDepartments;
const pageData = JSON.parse(dataString);
const amounts = pageData.expenditure.national;
const originalBudget = amounts.filter(function(amount) {
  return amount.budget_phase === "Main appropriation" && amount.financial_year === 2019;
});
const sorted = originalBudget.sort((a, b) => b.amount - a.amount);
const biggest = sorted.slice(0, 10);

const colored = index => colorArray[index];

const AddedColor = biggest.map((amount, index) => ({
  color: colored(index),
  ...amount
}));

const connection = () => {
  if (node) {
    return render(
        createElement(TreemapSection, { departments: AddedColor, isNationalBudget: true }),
        node
    )
  }
};

export default connection();
