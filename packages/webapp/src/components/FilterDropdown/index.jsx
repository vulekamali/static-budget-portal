import React, { Component } from 'react';
import Markup from './Markup';

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    this.onSelectionChange = this.onSelectionChange.bind(this);

    this.state = {
      selected: '',
    };

    this.events = {
      onSelectionChange: this.onSelectionChange.bind(this),
    };
  }

  onSelectionChange(e) {
    const { selected } = this.state;
    if (e.target.value === selected) {
      return null;
    }
    this.setState({ selected: e.target.value });
    return null;
  }

  render() {
    const { state, events, props } = this;

    const passedProps = {
      ...props,
      onSelectionChange: events.onSelectionChange,
      selected: state.selected,
    };

    return <Markup {...passedProps} />;
  }
}

export default FilterDropdown;
