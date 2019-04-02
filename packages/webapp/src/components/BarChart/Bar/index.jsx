import React, { Component } from 'react';
import Markup from './Markup';



class Bar extends Component {
  constructor(props) {
    super(props);
    this.componentNode = React.createRef();
    this.textNode = React.createRef();
    this.state = {
      labelOutside: null
    }
  }

  componentDidMount () {
    const ColorBarWidth = this.componentNode.current.clientWidth;
    const TextWidth = this.textNode.current.clientWidth;
    if (TextWidth => ColorBarWidth) return this.setState({ labelOutside: true });
    if (TextWidth <= ColorBarWidth) return this.setState({ labelOutside: false });
  }

  render() {
    const { state, props } = this;

    const passedProps = {
      ...props,
      labelOutside: state.labelOutside,
      textNode: this.textNode,
      componentNode: this.componentNode,
    };

    return <Markup {...passedProps } />
  }
}

export default Bar;
