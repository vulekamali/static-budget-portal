import { h } from 'preact';
import HorisontalGuide from './HorisontalGuide.jsx';


export default function HorisontalGuideList({ styling, totalGroupSpace }) {
  const { labelBreakpoints } = styling;
  const breakpointArray = '_'.repeat(labelBreakpoints).split('');
  // const { buffer, padding } = styling;

  return (
    <g className="Graph-verticalLabelList">
      {/* <rect
        x={padding[3] + buffer}
        y={padding[0]}
        height={totalGroupSpace}
        width={padding[3] - buffer}
        fill="red"
        opacity="0.5"
      /> */}

      {
        breakpointArray.map((val, index) => {
          return (
            <HorisontalGuide rank={index} {...{ styling, totalGroupSpace }} />
          );
        })
      }
    </g>
  );
}
