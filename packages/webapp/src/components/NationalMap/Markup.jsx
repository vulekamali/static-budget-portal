import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import Province from './Province';
import Point from './Point';
import Tooltip from './Tooltip';
import { provincesList} from './data.json';


const createProvince = (active, size) => name => {
  return <Province {...{ name, size }} active={active === 'Multiple' || active === name} key={name} />;
}


const findProject = (projects, pointId) => {
  const projectKeys = Object.keys(projects);
  
  for (let i = 0; i < projectKeys.length; i++) {
    const projectId = projectKeys[i];
    const project = projects[projectId];

    if (!!project.indexOf(pointId)) {
      return { projectId, project };
    }
  }

  return null;
}

const createPoint = (...args) => pointId => {
  const [
    points, 
    projects,
    hover, 
    selected, 
    updateHover, 
    updateSelected,
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
    projectData,
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


const Markup = (props) => {
  const { 
    active,
    points,
    hover,
    selected,
    pointId,
    size,
    updateSelected,
    updateHover,
    updatePoint,
    projects,
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

  return (
    <Wrapper>
      <svg 
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        width={size === 'small' ? 104 : 428}
        height={size === 'small' ? 89.5 : 375}
        viewBox="0 0 428 375"
      >
        {provincesList.map(createProvince(active, size))}
        {pointKeys.map(createPoint(...createPointArgs))}
      </svg>
      {/* <Tooltip x={100} y={100} text="Hello!" /> */}
    </Wrapper>
  )
}


export default Markup;


Markup.propTypes = {
  active: t.bool,
  points: t.arrayOf(t.shape({
    x: t.number,
    y: t.number,
    related: t.arrayOf(t.string)
  })),
}


Markup.defaultProps = {
  active: null,
  points: [],
}