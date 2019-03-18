import { createElement } from 'react';
import { render } from 'react-dom';
import TreemapSection from '../components/TreemapSection';

const node = document.querySelector('[data-webapp="national-departments-treemap"]');
const dataString = document.querySelector('[data-webapp-departments]').dataset.webappDepartments;
const pageData = JSON.parse(dataString);
const amounts = pageData.expenditure.national;
const originalBudget = amounts.filter(function(amount) {
  return amount.budget_phase === "Main appropriation" && amount.financial_year === 2019;
});
const sorted = originalBudget.sort((a, b) => b.amount - a.amount);
const biggest = sorted.slice(0, 10);


const colorArray = [
  '#FFD54F',
  '#E57373',
  '#4DD0E1',
  '#7986CB',
  '#BA68C8',
  '#4DB6AC',
  '#A1887F',
  '#64B5F6',
  '#E57373',
  '#FF8A65',
  '#FFD54F',
  '#4DD0E1',
  '#F06292',
  '#7986CB',
  '#BA68C8',
  '#4DB6AC',
  '#9575CD',
  '#A1887F',
  '#F06292',
  '#FFF176',
  '#FF8A65',
  '#64B5F6',
  '#81C784',
  '#9575CD',
  '#E57373',
  '#FFD54F',
  '#4DD0E1',
  '#BA68C8',
  '#A1887F',
  '#4DB6AC',
  '#7986CB',
  '#FFF176',
  '#4DD0E1',
  '#BA68C8',
  '#9575CD',
  '#FF8A65',
  '#64B5F6',
  '#F06292',
  '#81C784',
  '#7986CB',
];

const colored = index => colorArray[index];

const coloured = biggest.map((amount, index) => ({
  color: colored(index),
  ...amount
}));

const connection = () => {
  if (node) {
    return render(
        createElement(TreemapSection, { departments: coloured, isNationalBudget: true }),
        node
    )
  }
};

export default connection();
