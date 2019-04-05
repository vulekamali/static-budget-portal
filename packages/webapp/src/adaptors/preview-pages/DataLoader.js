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

    this.handleOnSelectChange = this.handleOnSelectChange.bind(this);
  }

  componentDidMount() {
    const { year, sphere, government, department } = this.props;
    const api = `/json/${year}/previews/${sphere}/${government}/original.json`;

    const loadliveData = ({ data }) =>
      this.setState({ data: transformData(data, department), loading: false });

    return axios.get(api)
      .then(({ data }) => data)
      .then(loadliveData);
  }

  handleOnSelectChange(event) {
    // this.setState({ [event.target.name]: event.target.value });
    console.log({ [event.target.name]: event.target.value });
  }

  render() {
    const { state, props } = this;
    const { loading, data } = state;

    if (loading || !data) {
      return createElement('div', {}, 'Loading...');
    }

    const passedProps = {
      ...data,
      sphere: props.sphere,
      handleOnSelectChange: this.handleOnSelectChange,
    };

    return createElement(Preview, passedProps);
  }
}

export default DataLoader;
