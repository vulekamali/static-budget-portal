import React, { Component } from 'react';

import Markup from './Markup';
import createColorGenerator from './generateColor';
import ResizeWindowListener from '../../helpers/ResizeWindowListener';
import sortItems from './sortItems';

const colorsList = createColorGenerator();

class TreeMapSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
      zoom: true,
      screenWidth: new ResizeWindowListener().stop(),
    };

    this.events = {
      zoomToggleHandler: this.zoomToggleHandler.bind(this),
      changeSelectedHandler: this.changeSelectedHandler.bind(this),
    };

    this.values = {
      fills: Object.keys(this.props.items).map(() => colorsList.next().value),
      sortedItems: sortItems(this.props.items),
      resizeListener: new ResizeWindowListener(this.changeWidthHandler.bind(this)),
    };
  }

  zoomToggleHandler() {
    const { zoom } = this.state;
    return this.setState({ zoom: !zoom });
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
    // console.log(state.zoom);
    const passedProps = { ...state, ...events, items: values.sortedItems, fills: values.fills };
    return <Markup {...passedProps} />;
  }
}

export default TreeMapSection;
