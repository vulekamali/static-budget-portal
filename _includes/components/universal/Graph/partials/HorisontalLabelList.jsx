import { h } from 'preact';
import HorisontalLabel from './HorisontalLabel.jsx';


export default function HorisontalLabelList({ totalGroupSpace, groupSpaceArray, items, styling }) {
  const titles = Object.keys(items);
  // const { padding, buffer, valueSpace } = styling;

  return (
    <g className="Graph-horisontalLabelList">
      {/* <rect
        x={padding[3] + buffer}
        y={padding[0] + totalGroupSpace + (buffer * 2)}
        width={valueSpace - buffer}
        height={padding[2] - (buffer * 2)}
        fill="red"
        opacity="0.5"
      /> */}

      {
        titles.map((title, index) => {
          return (
            <HorisontalLabel
              rank={index}
              {...{ title, totalGroupSpace, groupSpaceArray, styling }}
            />
          );
        })
      }
    </g>
  );
}
