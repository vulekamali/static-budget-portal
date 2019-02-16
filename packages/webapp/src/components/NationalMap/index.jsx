import React, { Component } from 'react';
import Markup from './Markup';
import convertGpsToVectorPoint from './convertGpsToVectorPoint';


const convertGps = (pointsRawpoints, size) => pointsRawpoints.reduce(
  (result, object) => {
    const {
      x,
      y,
      id,
    } = convertGpsToVectorPoint(object, size);

    return {
      ...result,
      [id]: {
        x,
        y,
        id,
      }
    }
  },
  {},
)


const getForcedSelect = (projectId, projects) => {
  console.log(projects)
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
      checkOverlap: this.checkOverlap.bind(this),
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

  checkOverlap(ref) {
    console.log(this.values.mapRef, ref)
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
      checkOverlap: events.checkOverlap,
    };

    return <Markup {...passedProps} />
  }
}


export default NationalMap;
