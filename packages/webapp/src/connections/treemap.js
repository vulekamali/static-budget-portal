import { createElement } from 'react';
import { render } from 'react-dom';
import TreeMap from '../components/Treemap';

const parseDepartments = department => ({
  id: department.slug,
  name: department.name,
  amount: department.amount,
  budget_phase: department.budget_phase,
  financial_year: department.financial_year,
  area_percentage: department.area_percentage,
  detail: department.detail,
});


const node = document.querySelector('[data-webapp="national-departments-treemap"]');
const departmentsString = document.querySelector('[data-webapp-departments]');
const departmentsArray = JSON.parse(customUnescape(departmentsString));
const departments = departmentsArray.map(parseDepartments);


const connection = () => {
  if (node) {
    return render(
        createElement(TreeMap, { departments })
    )
  }
};

export default connection();
