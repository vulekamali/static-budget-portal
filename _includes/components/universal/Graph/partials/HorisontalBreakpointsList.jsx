import { h } from 'preact';
import HorisontalBreakpoint from './HorisontalBreakpoint.jsx';


export default function HorisontalBreakpointsList({ items, styling, totalGroupSpace }) {
  const { valueSpace, buffer, padding, labelBreakpoints } = styling;
  const breakpointArray = '_'.repeat(labelBreakpoints).split('');

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
            <HorisontalBreakpoint rank={index} {...{ styling, totalGroupSpace }} />
          );
        })
      }
    </g>
  );
}
