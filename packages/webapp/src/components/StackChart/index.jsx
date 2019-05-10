import React, { Component } from 'react';
import createHeightConvertor from './createHeightConvertor';
import ResizeWindowListener from '../../helpers/ResizeWindowListener';
import calcActiveBlocks from './calcActiveBlocks';
import Markup from './Markup';
import ScrollOffsetListener from './ScrollOffsetListener';
import transformItems from './transformItems';

class Treemap extends Component {
  constructor(props) {
    super(props);
    const { items } = this.props;

    this.state = {
      selected: null,
      convertHeightFn: null,
      scrollOffset: null,
      zoom: null,
    };

    this.events = {
      updateCurrentActive: this.updateCurrentActive.bind(this),
      changeConvertHeightFnHandler: this.changeConvertHeightFnHandler.bind(this),
      changeScrollOffsetHandler: this.changeScrollOffsetHandler.bind(this),
    };

    this.values = {
      transformedItems: transformItems(items),
    };
  }
  
  componentDidMount () {
    const { events: { changeConvertHeightFnHandler, changeScrollOffsetHandler } } = this;
    changeConvertHeightFnHandler();

    this.values = {
      ...this.values,
      resizeListener: new ResizeWindowListener(changeConvertHeightFnHandler),
      scrollListener: new ScrollOffsetListener(changeScrollOffsetHandler),
    }
  }

  componentDidUpdate() {
    const { 
      values: { transformedItems }, 
      state: { scrollOffset }, 
      props: { threshold = 10 },
      events: { updateCurrentActive },
    } = this;
    
    if (scrollOffset || scrollOffset === 0) {
      updateCurrentActive(threshold, scrollOffset, transformedItems);
    }
  }

  updateCurrentActive(threshold, scrollOffset, transformedItems) {
    const { props: { onZoomChange, onSelectedChange, onActiveChange }, state: currentState } = this;
    const activeBlocks = calcActiveBlocks(threshold, scrollOffset, transformedItems);

    if (!activeBlocks) {
      return null;
    }

    const { zoom: newZoom, selected: newSelected } = activeBlocks;
    const noChange = currentState.selected === (newSelected && newSelected.id);

    if (noChange) {
      return null;
    }

    if (onActiveChange) {
      const isCurrentlyActive = !!currentState.selected;
      const willBeActive = !!newSelected;

      if (isCurrentlyActive !== willBeActive) {
        onActiveChange(willBeActive);
      }
    }

    if (onZoomChange) {
      onZoomChange(newZoom);
    }

    if (onSelectedChange) {
      const hasSelected = newSelected ? true : null;
      const props = hasSelected && {
        id: newSelected.id,
        name: newSelected.name,
        color: newSelected.color,
        value: newSelected.amount,
        url: newSelected.url,
        zoom: newSelected.zoom,
      };

      onSelectedChange(props);
    }

    this.setState({
      ...currentState,
      selected: (newSelected && newSelected.id),
      zoom: newZoom,
    });
  }

  componentWillUnmount() {
    const { resizeListener, scrollListener } = this.values;

    if (resizeListener) {
      resizeListener.stop();
    }

    if (scrollListener) {
      scrollListener.stop();
    }
  }

  changeScrollOffsetHandler(scrollOffset) {
    this.setState({ scrollOffset })
  }

  changeConvertHeightFnHandler() {
    const { items } = this.props;
  
    const convertHeightFn = createHeightConvertor(items);
    this.setState({ convertHeightFn });
  }

  render() {
    const { state, events, values: { transformedItems: items, refsArray } } = this;

    const passedProps = { 
      ...state,
      ...events,
      items,
      refsArray,
    };

    return <Markup {...passedProps} />;
  }
}

export default Treemap;
