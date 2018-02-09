import { h } from 'preact';


export default function HorisontalLineGroup({ totalGroupSpace, groupSpaceArray, rank, lines, title, styling }) {
  const {
    barWidth,
    titleHeight,
    padding,
    buffer,
    valueSpace,
  } = styling;

  const groupSpace = groupSpaceArray[rank];

  const previousSpace = groupSpaceArray.reduce(
    (result, val, index) => {
      if (index < rank) {
        return result + val;
      }

      return result;
    },
    0,
  );

  return (
    <g className="Graph-group">
      <rect
        x={padding[3] + buffer}
        y={padding[0] + previousSpace}
        width={valueSpace - buffer}
        height={groupSpace}
        fill="none"
        stroke="red"
        opacity="1"
      />
    </g>
  );
}
