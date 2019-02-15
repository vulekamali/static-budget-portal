import React, { Component } from 'react';
import Markup from './Markup';


class Infrastructure extends Component {
  constructor(props) {
    super(props);
    const { details: initialDetails } = this.props;

    this.state = {
      id: 0,
      details: initialDetails || false,
    }

    this.events = {
      nextId: this.nextId.bind(this),
    }
  }

  toggleDetails() {
    const { details } = this.state;
    this.setState({ details: !details })
  }

  nextId(value) {
    const { id } = this.state;
    const { projects } = this.props;
    const max = projects.length;

    if (value === true && value < max) {
      this.setState({ id: id + 1 })
    }

    if (value === false && id > 0) {
      this.setState({ id: id - 1 });
    }
  }

  render() {
    const { props, state, events } = this;

    const passedProps = {
      id: state.id,
      projects: props.projects || [],
      nextId: events.nextId,
      details: state.details,
      toggleDetails: events.toggleDetails,
    }

    return <Markup {...passedProps} />
  }
}


export default Infrastructure;


