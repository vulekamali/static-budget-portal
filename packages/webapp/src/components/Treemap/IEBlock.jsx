import React from 'react';
import { lighten } from 'polished';

const IEBlock = props => {
  const {
    depth,
    x,
    y,
    id,
    url,
    width,
    height,
    color,
    selected,
    name,
    amount,
    changeSelectedHandler,
    children,
    root,
    zoom,
    icon,
  } = props;

  if (depth < 1) return null;

  if (depth === 1) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
          }}
        />
      </g>
    );
  }

  if (depth === 2) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
            stroke: lighten(0.1, color),
            strokeWidth: 1,
          }}
        />
      </g>
    );
  }
};

export default IEBlock;
