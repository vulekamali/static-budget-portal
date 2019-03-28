import React, { Component } from 'react';

import Markup from './Markup';
import createColorGenerator from './generateColor';
import ResizeWindowListener from '../../helpers/ResizeWindowListener';

const colorsList = createColorGenerator();

class TreeMapSection extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      screenWidth: new ResizeWindowListener().stop(),
    };

    this.events = {
      changeSelectedHandler: this.changeSelectedHandler.bind(this),
    };

    this.values = {
      fills: this.props.items.map(() => colorsList.next().value),
      sortedItems: this.props.items.sort(({ amount: a }, { amount: b }) => b - a),
      resizeListener: new ResizeWindowListener(this.changeWidthHandler.bind(this)),
    };
  }

  changeSelectedHandler(selected) {
    const { onSelectedChange } = this.props;

    if (onSelectedChange) {
      onSelectedChange(selected);
    }

    this.setState({ selected });
  }

  changeWidthHandler(screenWidth) {
    if (screenWidth >= 600) {
      this.setState({ screenWidth });
    }
  }

  componentWillUnmount() {
    const { resizeListener } = this.values;

    if (resizeListener) {
      return resizeListener.stop();
    }

    return null;
  }

  render() {
    const { state, events, values } = this;
    const passedProps = { ...state, ...events, items: values.sortedItems, fills: values.fills };
    console.log(state.width)
    return <Markup {...passedProps} />;
  }
}

export default TreeMapSection;
