import React, { Component } from 'react';
import Markup from './Markup';



class Chart extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.state = {
      selected: null
    }

    this.events = {
      eventHandler: this.eventHandler.bind(this),
    }
  }

  eventHandler(e) {
    this.setState({ selected: e });
  }

  render() {
    const { state, events, props } = this;

    const passedProps = {
      ...props,
      eventHandler: events.eventHandler,
      selected: state.selected
    };

    return <Markup {...passedProps } />
  }
}


export default Chart;
