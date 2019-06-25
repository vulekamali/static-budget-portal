import React from 'react';

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

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
    </g>
  );
};

export default IEBlock;
