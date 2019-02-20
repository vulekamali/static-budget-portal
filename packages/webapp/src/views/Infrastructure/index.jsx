import React, { Component } from 'react';
import Markup from './Markup';


class Infrastructure extends Component {
  constructor(props) {
    super(props);
    const { 
      details: initialDetails,
      projectId,
      projects,
    } = this.props;

    const getId = () => projects.findIndex(({ slug }) => {
      return slug.replace(/^infrastructure-projects/g, '') === projectId;
    })

    this.state = {
      id: projectId ? getId() : 0,
      details: initialDetails || !!projectId || false,
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

    // return this.setState({ id: value });
  }

  render() {
    const { props, state, events } = this;
    const { id: selected } = props.projects[state.id];


    const passedProps = {
      id: state.id,
      projects: props.projects || [],
      points: props.points || [],
      nextId: events.nextId,
      details: state.details,
      toggleDetails: events.toggleDetails,
      datasetUrl: props.datasetUrl,
      budgetReviewUrl: props.budgetReviewUrl,
      Link: props.Link,
      chartData: props.chartData,
    }

    return <Markup {...passedProps} />
  }
}


export default Infrastructure;
