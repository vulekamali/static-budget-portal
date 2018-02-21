import { h } from 'preact';
import VerticalBreakpoints from './HorisontalBreakpoint.jsx';


export default function VerticalBreakpointsList({ items, styling, totalGroupSpace }) {
  const { valueSpace, buffer, padding, labelBreakpoints } = styling;
  let breakpointArray = [];

  for (let i = 0; i < labelBreakpoints; i++) {
    breakpointArray.push('');
  }

  return (
    <g className="Graph-verticalLabelList">
      <rect
        x={padding[3] + buffer}
        y={padding[0] + totalGroupSpace + buffer}
        height={padding[2] - buffer}
        width={(padding[3] + valueSpace) - (padding[2] + buffer)}
        fill="red"
        opacity="0.5"
      />

      {
        breakpointArray.map((val, index) => {
          return (
            <VerticalBreakpoints rank={index} {...{ styling, totalGroupSpace }} />
          );
        })
      }
    </g>
  );
}
