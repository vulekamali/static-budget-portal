import { Component, createElement } from 'react';
import axios from 'axios';

import Preview from '../../views/Preview';
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
    const { year, type, government, department } = this.props;
    const api = `/json/${year}/previews/${type}/${government}/original.json`;

    const loadliveData = ({ data }) =>
      this.setState({ data: transformData(data, department), loading: false });

    return axios.get(api)
      .then(({ data }) => data)
      .then(loadliveData);
  }

  render() {
    const { state } = this;
    const { loading, data } = state;

    if (loading || !data) {
      return createElement('div', {}, 'Loading...');
    }

    console.log(data);
    return createElement(Preview, data);
  }
}

export default DataLoader;
