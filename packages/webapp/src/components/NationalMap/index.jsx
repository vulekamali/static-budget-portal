import React, { Component } from 'react';
import Markup from './Markup';
import convertGpsToVectorPoint from './convertGpsToVectorPoint';


const convertGps = (pointsRawpoints, size) => pointsRawpoints.map((object) => {
  const {
    x,
    y,
    id,
  } = convertGpsToVectorPoint(object, size);

  return {
      x,
      y,
      id,
    }
  }
)


const getForcedSelect = (projectId, projects) => {
  return projectId ? projects[projectId].points[0] : null;
}


class NationalMap extends Component {
  constructor(props) {
    super(props);
    const { 
      points: pointsRawpoints = [],
      projects,
      size,
      selected: forcedSelect,
    } = this.props;

    const selected = forcedSelect ? getForcedSelect(forcedSelect, projects) : null;

    this.state = {
      hover: null,
      selected, 
    }

    this.events = {
      updateHover: this.updateHover.bind(this),
      updateSelected: this.updateSelected.bind(this),
    }

    this.values = {
      points: convertGps(pointsRawpoints, size),
    }
  }

  updateHover(hover) {
    this.setState({ hover });
  }

  updateSelected(selected) {
    this.setState({ selected });
  }

  render() {
    const { props, state, values, events } = this;

    const passedProps = {
      ...props,
      points: values.points,
      hover: state.hover,
      selected: state.selected,
      updateSelected: events.updateSelected,
      updateHover: events.updateHover,
    };

    return <Markup {...passedProps} />
  }
}


export default NationalMap;
