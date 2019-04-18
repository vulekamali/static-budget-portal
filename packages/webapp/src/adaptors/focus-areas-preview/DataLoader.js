import { Component, createElement } from 'react';
import axios from 'axios';

import FocusAreaPreview from '../../views/FocusAreaPreview';
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
    const { year, department } = this.props;
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

    const selectedObject = data.find(({ id }) => id === department);

    const initialSelected = {
      name: "Total",
      value: selectedObject.total,
      url: null,
      color: "#D8D8D8"
    }

    const passedProps = {
      items: data,
      department,
      year,
      initialSelected,
      selectedObject
    }
    return createElement(FocusAreaPreview, passedProps);
  }
}

export default DataLoader;
