import React, { Component } from 'react';

import Markup from './Markup';
import createColorGenerator from './generateColor';
import ResizeWindowListener from '../../helpers/ResizeWindowListener';
import sortItems from './sortItems';
import modifyIfZoomed from './modifyIfZoomed';

const colorsList = createColorGenerator();

class Treemap extends Component {
  constructor(props) {
    super(props);

    const { items } = this.props;

    const screenWidth = new ResizeWindowListener().stop();

    this.state = {
      selected: null,
      screenWidth,
      zoom: null,
    };

    this.events = {
      unsetZoomHandler: this.unsetZoomHandler.bind(this),
      changeSelectedHandler: this.changeSelectedHandler.bind(this),
    };

    this.values = {
      fills: Object.keys(items).map(() => colorsList.next().value),
      sortedItems: sortItems(items),
      hasChildren: !Array.isArray(items),
    };
  }

  componentDidMount() {
    this.values = {
      ...this.values,
      resizeListener: new ResizeWindowListener(this.changeWidthHandler.bind(this)),
    };
  }

  componentWillUnmount() {
    const { resizeListener } = this.values;

    if (resizeListener) {
      return resizeListener.stop();
    }

    return null;
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
      selected: selected.id,
      zoom: selected.zoom || null,
    });
  }

  changeWidthHandler(screenWidth) {
    if (screenWidth >= 600) {
      this.setState({ screenWidth });
    }
  }

  render() {
    const {
      state,
      events,
      values,
      props: { icons },
    } = this;
    const items = modifyIfZoomed(values.sortedItems, state.zoom);

    const passedProps = {
      ...state,
      ...events,
      items,
      fills: values.fills,
      hasChildren: values.hasChildren,
      icons,
    };

    return <Markup {...passedProps} />;
  }
}

export default Treemap;
