import React, { Component } from 'react';
import Markup from './Markup';



class ChartSection extends Component {
  constructor(props) {
    super(props);
    const { initialSelected } = this.props;
    this.state = {
      selected: initialSelected || null,
      exploreButtonState: true,
    }

    this.events = {
      onSelectedChange: this.onSelectedChange.bind(this),
    }
  }

  onSelectedChange(event) {
    this.setState({ selected: event, exploreButtonState: false });
  }

  render() {
    const { state, events, props } = this;

    const passedProps = {
      ...props,
      selected: state.selected,
      exploreButtonState: state.exploreButtonState,
      onSelectedChange: events.onSelectedChange
    };

    return <Markup {...passedProps } />
  }
}


export default ChartSection;
