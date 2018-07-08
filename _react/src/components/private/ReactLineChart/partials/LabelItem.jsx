import React from 'react';


export default function LabelItem({ totalGroupSpace, groupSpaceArray, rank, title, styling }) {
  const {
    padding,
    buffer,
    valueSpace,
    svgHeight
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

      {/* <rect
        y={285}
        x={padding[3] + previousSpace + buffer}
        width={generateToScale(groupSpace)}
        height={padding[2]}
        fill="none"
        stroke="red"
        opacity="1"
      /> */}

      <text
        className="Graph-label"
        y={svgHeight + padding[0] + (buffer * 2)}
        x={padding[3] + previousSpace + buffer + (generateToScale(groupSpace) / 2)}
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
        fill="#3f3f3f"
        fontSize="14"
      >
        {title}
      </text>

    </g>
  );
}
