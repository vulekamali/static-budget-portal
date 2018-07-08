import React from 'react';
import trimValues from './trimValues.js';


export default function BreakpointItem({ styling, totalGroupSpace, rank, fontSize }) {
  const { buffer, padding, labelBreakpoints, maxValue, svgHeight } = styling;
  const iterationValue = maxValue / (labelBreakpoints - 1);
  const iterationPosition = svgHeight / (labelBreakpoints - 1);

  return (

    <text
      x={padding[3] - buffer}
      y={padding[0] + 7 + (iterationPosition * rank)}
      fill="#3f3f3f"
      textAnchor="end"
      fontSize={fontSize}
      fontWeight="bold"
      fontFamily="sans-serif"
    >
      R{trimValues(iterationValue * (labelBreakpoints - (rank + 1)), true)}
    </text>
  );
}
