import React, { Component } from 'react';

import Markup from './Markup';
import createColorGenerator from './generateColor';
import ResizeWindowListener from '../../helpers/ResizeWindowListener';
import sortItems from './sortItems';
import modifyIfZoomed from './modifyIfZoomed';

const colorsList = createColorGenerator();

class StackChart extends Component {
  constructor(props) {
    super(props);

    const screenWidth = new ResizeWindowListener().stop();

    this.state = {
      selected: null,
      screenWidth: screenWidth,
      zoom: null,
    };

    this.events = {
      unsetZoomHandler: this.unsetZoomHandler.bind(this),
      changeSelectedHandler: this.changeSelectedHandler.bind(this),
    };

    this.values = {
      fills: Object.keys(this.props.items).map(() => colorsList.next().value),
      sortedItems: sortItems(this.props.items),
      hasChildren: !Array.isArray(this.props.items),
    };
  }

  componentDidMount() {
    this.values = {
      ...this.values,
      resizeListener: new ResizeWindowListener(this.changeWidthHandler.bind(this)),
    }
  }

  unsetZoomHandler() {
    const { onSelectedChange } = this.props;

    if (onSelectedChange) {
      onSelectedChange(null);
    }
    
    return this.setState({ 
      selected: null,
      zoom: null,
    });
  }

  changeSelectedHandler(selected) {
    const { onSelectedChange } = this.props;

    if (onSelectedChange) {
      onSelectedChange(selected);
    }

    this.setState({ 
      selected: selected && selected.id,
      zoom: selected && selected.zoom || null,
    });
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
    const {canStickToTop} = this.props;
    const items = modifyIfZoomed(values.sortedItems, state.zoom);

    const passedProps = { 
      ...state,
      ...events,
      items,
      fills: values.fills,
      hasChildren: values.hasChildren,
      canStickToTop 
    };

    return <Markup {...passedProps} />;
  }
}

export default StackChart;
