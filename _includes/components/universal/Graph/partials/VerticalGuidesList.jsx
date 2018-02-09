import { h } from 'preact';
import VerticalGuide from './VerticalGuide.jsx';


export default function VerticalGuidesList({ styling, totalGroupSpace }) {
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
          if (index !== breakpointArray.length - 1) {
            return (
              <VerticalGuide rank={index} {...{ styling, totalGroupSpace }} />
            );
          }

          return null;
        })
      }
    </g>
  );
}
