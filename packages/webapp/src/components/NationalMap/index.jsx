import React, { Component } from 'react';
import Markup from './Markup';


class NationalMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: null,
      selected: null,
      point: null,
    }

    this.events = {
      updateHover: this.updateHover.bind(this),
      updateSelected: this.updateSelected.bind(this),
      updatePoint: this.updatePoint.bind(this),
    }
  }

  updateHover(hover) {
    this.setState({ hover });
  }

  updateSelected(selected) {
    this.setState({ selected });
  }

  updatePoint(pointId) {
    this.setState({ pointId });
  }

  render() {
    const { props, state, events } = this;

    const passedProps = {
      ...props,
      hover: state.hover,
      selected: state.selected,
      pointId: state.pointId,
      updateSelected: events.updateSelected,
      updateHover: events.updateHover,
      updatePoint: events.updatePoint,
    };

    return <Markup {...passedProps} />
  }
}


export default NationalMap;
