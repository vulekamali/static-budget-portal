import { Component, createElement } from 'react';
import axios from 'axios';

import { Tloading, TtransformedData } from './types';
import transformData from './transformData';
import NationalTreemap from '../../views/NationalTreemap';
import { api } from './config.json';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null,
    };
  }

  componentDidMount() {
    const loadliveData = ({ data }): any =>
      this.setState({ data: transformData(data), loading: false });
    return axios.get(api).then(loadliveData);
  }

  render() {
    const { state, ...events } = this;
    const { loading, data } = state;

    if (!loading || data) {
      return createElement('div', {}, 'Loading...');
    }

    const passedProps = { ...events };

    return createElement(NationalTreemap, passedProps, 'Hello World!');
  }
}

export default Container;
