import { Component, createElement } from 'react';
import axios from 'axios';

import NationalTreemap from '../../views/NationalTreemap';
import transformData from './transformData';
import { api } from './config.json';

class DataLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
    };
  }

  componentDidMount() {
    const loadliveData = ({ data }) =>
      this.setState({ data: transformData(data), loading: false });

    return axios.get(api)
      .then(({ data }) => data)
      .then(loadliveData);
  }

  render() {
    const { state, ...events } = this;
    const { loading, data } = state;

    if (loading || !data) {
      return createElement('div', {}, 'Loading...');
    }

    const passedProps = { ...events, data };

    return createElement(NationalTreemap, passedProps, 'Hello World!');
  }
}

export default DataLoader;
