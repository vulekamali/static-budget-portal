import React from 'react';
import breakIntoWrap from './../partials/breakIntoWrap.js';

export default function ReactHeading({ heading, subReactHeading, type, left }) {
  const titleArray = breakIntoWrap(heading, 33);

  return (
    <g>
      <text y="49" x={left} fontSize="28" fontWeight="bold" fill="#3f3f3f" fontFamily="sans-serif">
        {
          titleArray.map((text, index) => <tspan x={left} y={49 + (30 * index)}>{text.trim()}</tspan>)
        }
      </text>
      <text y={42 + (30 * titleArray.length)} x={left} fontSize="14" fontWeight="bold" fill="#808080" fontFamily="sans-serif">{ subReactHeading }</text>
      <text y={62 + (30 * titleArray.length)} x={left} fontSize="14" fontWeight="bold" fill="#79b43c" fontFamily="sans-serif">{ type }</text>
    </g>
  );
}
