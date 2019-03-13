import axios from 'axios';
import React, { createElement, Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'
import Infrastructure from '../views/Infrastructure';
import Loading from '../views/Loading';


const parseProjects = (projects, dataset_url) => projects.map(project => ({
  id: project.slug,
  subheading: project.department.name,
  heading: project.name,
  points: project.coordinates.map(({ latitude: y, longitude: x }, id) => ({ id: id.toString(), x, y })),
  activeProvinces: project.provinces,
  stage: project.stage,
  totalBudget: project.total_budget,
  projectedBudget: project.projected_budget,
  description: project.description,
  link: project.slug,
  resources: [
    buildEne(project.department.budget_document),
    datasetUrl(dataset_url),
  ].filter(({ link }) => !!link),
  chartData: project.expenditure.map(obj => ({
    name: obj.year,
    Actual: obj.budget_phase === 'Audited Outcome' ? obj.amount : null,
    Projected: obj.budget_phase !== 'Audited Outcome' ? obj.amount : null,
    Connection : isConnectionYear(obj.year) ? obj.amount : null,
  })),
  sideInfo: {
    investment: project.nature_of_investment,
    infrastructure: project.infrastructure_type,
    department: project.department,
  },
}))

class InfrastructurePages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      projects: [],
      datasetUrl: null,
      points: [],
    }
  }

  componentDidMount() {
    axios.get('/json/infrastructure-projects.json')
      .then(({ data }) => {
        this.setState({
        loading: false,
        datasetUrl: data.dataset_url,
        projects: parseProjects(data.projects, data.dataset_url),
      })})
  }

  render() {
    const { projects, points, loading, datasetUrl } = this.state;
    const { budgetReviewUrl, details, projectId } = this.props;

    if (loading) {
      return createElement(Loading);
    }

    return createElement(Infrastructure, { projects, points, datasetUrl, budgetReviewUrl, Link, details, projectId })
  }
}


const node = document.querySelector('[data-webapp="infrastructure-pages"]');
const budgetReviewUrl = !!node && node.getAttribute('data-webapp-budgetReviewUrl');


const connection = () => {
  if (node) {
    return render(
        'hey whats up folks'
    )
  }
};


export default connection();
