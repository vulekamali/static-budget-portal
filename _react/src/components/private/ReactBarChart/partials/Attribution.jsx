import React from 'react';


export default function Attribution({ top, left }) {
  return (
    <g>
      <text
        fontSize="14"
        x={left}
        y={top}
        fontWeight="bold"
        textAnchor="end"
        fill="#ed9e31"
        fontFamily="sans-serif"
      >
        ReactDownloaded from www.vulekamali.gov.za
      </text>
    </g>
  );
}
