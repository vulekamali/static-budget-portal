import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import Province from './Province';
import Point from './Point';
import Tooltip from './Tooltip';
import { provincesList} from './data.json';


const createProvince = (activeProvinces, size) => name => {
  return <Province {...{ name, size, activeProvinces }} key={name} />;
}


const findProject = (projects, pointId) => {
  if (!pointId) {
    return {};
  }

  const projectKeys = Object.keys(projects);
  
  for (let i = 0; i < projectKeys.length; i++) {
    const projectId = projectKeys[i];
    const project = projects[projectId];

    if (!!project.points.find(id => id === pointId)) {
      return project;
    }
  }

  return {};
}

const createPoint = (...args) => pointId => {
  const [
    points, 
    projects,
    hover, 
    selected, 
    updateHover, 
    updateSelected,
    checkOverlap,
  ] = args;

  const { 
    x,
    y,
  } = points[pointId];

  const projectData = findProject(projects, pointId);

  const pointProps = {
    x,
    y,
    hoveredId: hover,
    selectedId: selected,
    updateHover, 
    updateSelected,
    projectData,
    pointId,
    checkOverlap,
  };

  return (
    <Point 
      {...pointProps}
      hover
      selected
      key={`${x}-${y}`}
    />
  )
};


const Wrapper = styled.div`
  position: relative;
  width: 428px;
  height: 375px;
`;


const calcTooltipProps = ({ points: pointRefs = [], title }, points) => {
  return pointRefs.map(key => ({ ...points[key], title }));
};


const Markup = (props) => {
  const {
    active,
    points,
    hover,
    selected,
    size,
    updateSelected,
    updateHover,
    projects = {},
  } = props;

  const createPointArgs = [
    points, 
    projects,
    hover, 
    selected, 
    updateHover, 
    updateSelected,
  ];

  const pointKeys = Object.keys(points);

  const defineSvgShadowForHover = (
    <defs>
      <filter id="shadow" x="-200%" y="-200%" width="500%" height="500%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
      </filter>
    </defs>
  );


  const pointId = points[hover];
  const { id } = pointId || {};
  const project = findProject(projects, id);
  const { provinces: activeProvinces } = findProject(projects, selected);


  return (
    <Wrapper>
      <svg
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        width={size === 'small' ? 104 : 428}
        height={size === 'small' ? 89.5 : 375}
        viewBox="0 0 428 375"
      >
        {defineSvgShadowForHover}
        {provincesList.map(createProvince(activeProvinces, size))}
        {pointKeys.map(createPoint(...createPointArgs))}
      </svg>
      <Tooltip items={calcTooltipProps(project, points)} />
    </Wrapper>
  )
}


export default Markup;


Markup.propTypes = {
  active: t.bool,
}


Markup.defaultProps = {
  active: null,
}