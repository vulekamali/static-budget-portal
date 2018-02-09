import { h } from 'preact';
import VerticalLineGroup from './VerticalLineGroup.jsx';


export default function VerticalLineGroupList({ totalGroupSpace, groupSpaceArray, items, styling }) {
  const titles = Object.keys(items);
  // const { padding, buffer, valueSpace } = styling;

  return (
    <g className="LineGroupList">
      {/* <rect
        x={padding[3] + buffer}
        y={padding[0]}
        width={valueSpace - buffer}
        height={totalGroupSpace}
        fill="red"
        opacity="0.5"
      /> */}

      {
        titles.map((key, index) => {
          return (
            <VerticalLineGroup
              rank={index}
              lines={items[key]}
              title={key}
              {...{ totalGroupSpace, groupSpaceArray, styling }}
            />
          );
        })
      }
    </g>
  );
}
