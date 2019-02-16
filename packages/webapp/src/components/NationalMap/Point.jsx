import React from 'react';
import styled from 'styled-components';


const getcircle = name => ({ hover, selected }) => {
  if (selected && name === 'fill') {
    return 'white';
  }

  if (hover && !selected) {
    if (name === 'transform') {
      return 'translateY(-2px)'
    }

    return 'black';
  }

  if (name === 'transform') {
    return 'translateY(0)'
  }

  if (name === 'fill') {
    return '#5F5F5F'
  }
  return '';
}


const getshadow = ({ hover, select }) => {
  if (hover && !select) {
    return '0.4'
  }

  return '0'
}


const calcState = (pointId, related = [], hoverId, selectedId) => {
  const hover = pointId === hoverId || !!related.find(id => id === hoverId);
  const selected = pointId === selectedId || !!related.find(id => id === selectedId);

  return {
    selected,
    hover,
  }
}


const Pin = styled.circle`
  transform: ${getcircle('transform')};
  fill: ${getcircle('fill')};
  stroke: ${getcircle('stroke')};
  transition: transform 0.3s;
`;

const HitMap = styled.circle`
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
`

const Shadow = styled.rect`
  opacity: ${getshadow};
`

const Point = (props) => {
  const { 
    x: cx,
    y: cy,
    hoveredId,
    selectedId,
    updateHover, 
    updateSelected,
    projectData,
    pointId,
  } = props;

  const { hover, selected } = calcState(pointId, projectData.points, hoveredId, selectedId)
  const mouseEnterWrapper = () => updateHover(pointId);
  const mouseLeaveWrapper = () => updateHover(null);
  const clickWrapper = () => updateSelected(pointId);

  return (
    <g>
      <Shadow 
      {...{ hover, selected }}
      x={cx - 5} 
      y={cy - 3} 
      width="10" 
      height="10"
      filter="url(#shadow)"
    />
      <Pin
        {...{ cx, cy,  hover, selected }}
        r="5"
        strokeWidth="3"
        stroke={selected ? 'black' : 'none'}
      />
      <HitMap
        {...{ cx, cy }}
        onClick={clickWrapper}
        onMouseEnter={mouseEnterWrapper}
        onMouseLeave={mouseLeaveWrapper}
        onMouse
        r="15"
        opacity="0"
      /> 
    </g>
  );
}


export default Point;
