import { h } from 'preact';
import VerticalTooltips from './VerticalTooltips.jsx';


export default function VerticalTooltipsList({ totalGroupSpace, groupSpaceArray, items, styling }) {
  const titles = Object.keys(items);
  const { padding, buffer, valueSpace } = styling;

  return (
    <g className="LineGroupList">
      {/* <rect
        x={padding[3] + buffer}
        y="0"
        width={valueSpace - buffer}
        height={totalGroupSpace + padding[0]}
        fill="red"
        opacity="0.5"
      /> */}

      {
        titles.map((key, index) => {
          return (
            <VerticalTooltips
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
