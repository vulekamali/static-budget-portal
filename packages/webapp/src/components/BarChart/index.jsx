import React, { Component } from 'react';
import t from 'prop-types';
import Markup from './Markup';



class Homepage extends Component {
  constructor(props) {
    super(props);
    this.componentWidth = React.createRef();
    this.state = {
      labelOutside: false
    }
  } 

  render() {
    const { state, props } = this;

    const passedProps = {
      ...props,
      labelOutside: state.labelOutside,
      componentWidth: this.componentWidth,
    };

    return <Markup {...passedProps } />
  }
}


export default Homepage;
