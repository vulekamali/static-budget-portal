import { Component } from 'react';

class DataLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: null
    }
  }
}

export default DataLoader;
