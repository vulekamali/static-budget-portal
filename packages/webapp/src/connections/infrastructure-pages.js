import axios from 'axios';
import { uniq}
import { createElement, Component } from 'react';
import { render } from 'react-dom';
import Infrastructure from '../views/Infrastructure';
import Loading from '../views/Loading';


const getGpsPoints = (projects) => {
  const array = projects.reduce(
    (result, { coordinates }) => [
      ...result,
      ...coordinates,
    ],
    [],
  )

  const uniquePoint = array.
};



class InfrastructurePages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      projects: [],
      points: [],
    }
  }

  componentDidMount() {
    axios.get('/infrastruture-projects_copy.json')
      .then(data => console.log(data))
  }

  render() {
    const { projects, points, loading } = this.state;

    if (loading) {
      return createElement(Loading);
    }

    return createElement(Infrastructure, { projects, points })
  }
}


const node = document.querySelector('[data-webapp="infrastructure-pages"]');


const connection = () => {
  if (node) {
    return render(createElement(InfrastructurePages, {}), node);
  }
};


export default connection();
