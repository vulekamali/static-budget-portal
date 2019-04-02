import React, { Component } from 'react';
import Markup from './Markup';
import createColorGenerator from './generateColor';

const colorsList = createColorGenerator();



class Bar extends Component {
  constructor(props) {
    super(props);
    this.componentNode = React.createRef();
    this.textNode = React.createRef();
    this.state = {
      labelOutside: null
    }

    this.values = {
      fills: Object.keys(this.props.items).map(() => colorsList.next().value),
    };
  }

  componentDidMount () {
    this.values = {
      ...this.values,
    }
    const ColorBarWidth = this.componentNode.current.clientWidth - 24;
    const TextWidth = this.textNode.current.clientWidth;

    if (TextWidth >= ColorBarWidth) {
      return this.setState({ labelOutside: true });
    }

    return this.setState({ labelOutside: false });
  }

  render() {
    const { state, props } = this;

    const passedProps = {
      ...props,
      labelOutside: state.labelOutside,
      textNode: this.textNode,
      componentNode: this.componentNode,
      fills: this.values.fills,
    };

    return <Markup {...passedProps } />
  }
}

export default Bar;
