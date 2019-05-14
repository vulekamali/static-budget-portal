import React, { Component } from 'react';
import Markup from './Markup';

class Preview extends Component {
  constructor(props) {
    super(props);
    const { department, items } = this.props;

    this.state = {
      selected: department,
    };

    this.events = {
      eventHandler: this.eventHandler.bind(this),
    };

    this.departmentNames = items.map(({ id, title }) => ({
      id,
      name: title,
    }));

    this.eventHandler = this.eventHandler.bind(this);
  }

  eventHandler(e) {
    const {
      state: { selected },
      props: { year, sphere, government },
    } = this;

    if (e.target.value === selected) {
      return null;
    }

    const newUrl = `/${year}/previews/${sphere}/${government}/${e.target.value}`;

    window.history.pushState({}, window.document.title, newUrl);
    this.setState({ selected: e.target.value });
    return null;
  }

  render() {
    const { state, events, props } = this;
    const selectedObject = props.items.find(({ id }) => id === state.selected);

    const passedProps = {
      ...props,
      ...selectedObject,
      eventHandler: events.eventHandler,
      selected: state.selected,
      government: props.government,
      departmentNames: this.departmentNames,
      year: props.year,
    };

    return <Markup {...passedProps} />;
  }
}

export default Preview;
