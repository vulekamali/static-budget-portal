import axios from 'axios';
import React, { createElement, Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Infrastructure from '../views/Infrastructure';
import Loading from '../views/Loading';

const isConnectionYear = year => year === '2017' || year === '2018';

const parseProjects = projects => projects.map(project => ({
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
  resources: [],
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
    axios.get('/json/infrastruture-projects.json')
      .then(({ data }) => this.setState({
        loading: false,
        datasetUrl: data.datasetUrl,
        projects: parseProjects(data.projects),
      }))
  }

  render() {
    const { projects, points, loading, datasetUrl} = this.state;
    const { budgetReviewUrl, details, projectId } = this.props;

    if (loading) {
      return createElement(Loading);
    }

    return createElement(Infrastructure, { projects, points, datasetUrl, budgetReviewUrl, Link, details, projectId })
  }
}


const node = document.querySelector('[data-webapp="infrastructure-pages"]');
const budgetReviewUrl = node.getAttribute('data-webapp-budgetReviewUrl');


const connection = () => {
  if (node) {
    return render(
      (
        <Router>
          <div>
            <Route
              exact
              path="/infrastructure-projects"
              component={() => <InfrastructurePages {...{ budgetReviewUrl }} />}
            />
            <Route
              path="/infrastructure-projects/:projectId"
              component={
                ({ projectId }) => <InfrastructurePages {...{ budgetReviewUrl, projectId }} details />
              }
            />
          </div>
        </Router>
      ),
      node,
    );
  }
};


export default connection();
