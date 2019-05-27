import React, { Component } from 'react';
import Markup from './Markup';

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    const { department, items } = this.props;

    this.state = {
      selected: department,
    };

    this.events = {
      eventHandler: this.eventHandler.bind(this),
    };

    this.departmentNames = items.map(({ id, name }) => ({
      id,
      name,
    }));
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

    const selectedkey = props.items.findIndex(({ id }) => id === state.selected);
    const selectedObject = props.items[selectedkey];

    const initialSelectedNational = {
      name: 'National Department Contributions',
      value: selectedObject.national.total,
      url: null,
      color: '#D8D8D8',
    };

    const initialSelectedProvincial = {
      name: 'Provincial Department Contributions',
      value: selectedObject.provincial.total,
      url: null,
      color: 'rgba(0, 0, 0, 0.1)',
    };

    const passedProps = {
      ...props,
      eventHandler: events.eventHandler,
      selected: state.selected,
      government: props.government,
      departmentNames: this.departmentNames,
      year: props.year,
      initialSelectedNational,
      initialSelectedProvincial,
    };

    return <Markup {...passedProps} />;
  }
}

export default FilterDropdown;
