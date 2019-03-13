import axios from 'axios';
import React, { createElement, Component } from 'react';
import { render } from 'react-dom';
import TreeMap from '../components/Treemap';
import Loading from '../views/Loading';

const parseDepartments = (departments) => departments.map(department => ({
  id: department.slug,
  name: department.name,
  amount: department.amount,
  budget_phase: department.budget_phase,
  financial_year: department.financial_year,
  area_percentage: department.area_percentage,
  detail: department.detail,
}));

class PopulatedTreeMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      departments: [],
    }
  }

  componentDidMount() {
    axios.get('/json/department-treemap.json')
      .then(({ data }) => {
        this.setState({
        loading: false,
        departments: parseDepartments(data['expenditure']['national']),
      })})
  }

  render() {
    const { departments, loading } = this.state;

    if (loading) {
      return createElement(Loading);
    }

    return createElement(TreeMap, { departments })
  }
}


const node = document.querySelector('[data-webapp="national-departments-treemap"]');


const connection = () => {
  if (node) {
    return render(
        createElement(PopulatedTreeMap)
    )
  }
};


export default connection();
