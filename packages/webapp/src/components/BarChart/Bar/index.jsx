import React, { Component } from 'react';
import Markup from './Markup';



class Bar extends Component {
  constructor(props) {
    super(props);
    this.componentWidth = React.createRef();
    this.htmlNode = React.createRef();
    this.state = {
      labelOutside: null
    }
  }

  componentDidMount () {
    // console.log(this.componentWidth.current.offsetWidth)
  }

  render() {
    const { state, props } = this;

    const passedProps = {
      ...props,
      labelOutside: state.labelOutside,
      htmlNode: this.htmlNode,
    };

    return <Markup {...passedProps } />
  }
}

export default Bar;
