import { h } from 'preact';
import VerticalLabel from './VerticalLabel.jsx';


export default function VerticalLabelList({ totalGroupSpace, groupSpaceArray, items, styling }) {
  const titles = Object.keys(items);
  const { padding, buffer, valueSpace } = styling;

  return (
    <g className="Graph-horisontalLabelList">
      <rect
        x="0"
        y={padding[0]}
        width={padding[3] - buffer}
        height={totalGroupSpace}
        fill="red"
        opacity="0.5"
      />

      {
        titles.map((title, index) => {
          return (
            <VerticalLabel
              rank={index}
              {...{ title, totalGroupSpace, groupSpaceArray, styling }}
            />
          );
        })
      }
    </g>
  );
}
