import React, { Component } from 'react';
import Markup from './Markup';

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);

    this.state = {
      selected: '',
    };

    this.events = {
      eventHandler: this.eventHandler.bind(this),
    };

    // this.departmentNames = items.map(({ id, name }) => ({
    //   id,
    //   name,
    // }));
  }

  eventHandler(e) {
    const { updateUrl, year } = this.props;
    const { selected } = this.state;
    if (e.target.value === selected) {
      return null;
    }
    if (updateUrl) {
      const newUrl = `/${year}/focus/${e.target.value}`;
      window.history.pushState({}, window.document.title, newUrl);
    }
    this.setState({ selected: e.target.value });
    return null;
  }

  render() {
    const { state, events, props } = this;

    const passedProps = {
      ...props,
      eventHandler: events.eventHandler,
      selected: state.selected,
      // departmentNames: this.departmentNames,
      year: props.year,
    };

    return <Markup {...passedProps} />;
  }
}

export default FilterDropdown;
