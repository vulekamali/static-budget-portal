import { h } from 'preact';


export default function VerticalLabel({ totalGroupSpace, groupSpaceArray, rank, title, styling }) {
  const {
    barWidth,
    padding,
    buffer,
    valueSpace,
  } = styling;

  const groupSpace = groupSpaceArray[rank];

  const generateToScale = (value) => {
    return ((valueSpace - buffer) / totalGroupSpace) * value;
  };

  const previousSpace = groupSpaceArray.reduce(
    (result, val, index) => {
      if (index < rank) {
        return result + generateToScale(val);
      }

      return result;
    },
    0,
  );

  return (
    <g className="Graph-horisontalLabel">

      <rect
        x="0"
        y={padding[0] + previousSpace}
        width={padding[3] - buffer}
        height={generateToScale(groupSpace)}
        fill="none"
        stroke="red"
        opacity="1"
      />


      {/* <text
        className="Graph-label"
        x={padding[3] + buffer + previousSpace + generateToScale(groupSpace / 2)}
        y={padding[0] + totalGroupSpace + (buffer * 2) + fontSize}
        fontSize={fontSize}
      >
        {title}
      </text> */}

    </g>
  );
}
