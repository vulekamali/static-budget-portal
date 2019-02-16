import React from 'react';
import styled from 'styled-components';


const getCircle = ({ hover, select }) => {
  if (hover && !select) {
    return 'translateY(-13px)'
  }

  return 'translateY(0)'
}


const getShadow = ({ hover, select }) => {
  if (hover && !select) {
    return '0.15'
  }

  return '0'
}


const GroupController = styled.g`
  cursor: pointer;

  .circle {
    transform: ${getCircle};
    cursor: pointer;
    transition: transform 0.3s;
  }

  .shadow {
    opacity: ${getShadow};
    transition: opacity 0.6s;
  }

  &:hover .circle {
    transform: translateY(-13px);
  }

  &:hover .shadow {
    opacity: 0.1;
  }
`;


const Point = ({ x: cx, y: cy, hover, selected }) => {
  return (
    <GroupController {...{ hover, selected }}>
      <ellipse 
        {...{ cx, cy }}
        rx="13"
        ry="3"
        fill="black"
        opacity={0.15}
        className="shadow"
      />
      <circle className="circle"
        {...{ cx, cy }}
        r="5"
        strokeWidth="3"
        stroke={selected ? 'black' : 'none'} 
        fill={selected ? 'white' : '#5F5F5F'}
      />
      <circle
        {...{ cx, cy }}
        r="15"
        opacity="0"
      /> 
    </GroupController>
  );
}


export default Point;
