import { Component, createElement } from 'react';
import axios from 'axios';

import FocusAreaPreview from '../../views/FocusArea';
import transformData from './transformData';

class DataLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
    };
  }

  componentDidMount() {
    const { year } = this.props;
    const api = `/json/${year}/focus.json`;

    const loadliveData = ({ data }) =>
      this.setState({ data: transformData(data), loading: false });

    return axios.get(api)
      .then(({ data }) => data)
      .then(loadliveData);
  }

  render() {
    const { state, props } = this;
    const { loading, data } = state;
    const { department, year } = props;

    if (loading || !data) {
      return createElement('div', {}, 'Loading...');
    }

    const selectedKey = data.findIndex(({ id }) => id === department);
    const selectedObject = data[selectedKey];

    const initialSelectedNational = {
      name: "National Department Contributions",
      value: selectedObject.total,
      url: null,
      color: "#D8D8D8"
    }

    const initialSelectedProvincial = {
      name: 'Provincial Department Contributions',
      value: 0,
      url: null,
      color: 'rgba(0, 0, 0, 0.1)'
    }

    const passedProps = {
      items: data,
      department: this.props.department,
      year,
      initialSelectedNational,
      initialSelectedProvincial,
      selectedObject
    }
    
    return createElement(FocusAreaPreview, passedProps);
  }
}

export default DataLoader;
