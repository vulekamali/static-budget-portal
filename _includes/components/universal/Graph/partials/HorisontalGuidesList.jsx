import { h } from 'preact';
import HorisontalGuide from './HorisontalGuide.jsx';


export default function HorisontalGuideList({ styling, totalGroupSpace }) {
  const { labelBreakpoints } = styling;

  let breakpointArray = [];

  for (let i = 0; i < labelBreakpoints; i++) {
    breakpointArray.push('');
  }

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
          if (index !== breakpointArray.length - 1) {
            return (
              <HorisontalGuide rank={index} {...{ styling, totalGroupSpace }} />
            );
          }

          return null;
        })
      }
    </g>
  );
}
