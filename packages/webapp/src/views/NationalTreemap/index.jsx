import React, { Component } from 'react';
import Markup from './Markup';



class NationalTreemap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render() {
    const { state, props } = this;

    const passedProps = {
      ...props,
      loading: state.loading,
    };

    return <Markup {...passedProps } />
  }
}


export default NationalTreemap;
