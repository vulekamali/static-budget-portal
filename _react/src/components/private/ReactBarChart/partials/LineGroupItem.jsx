import React from 'react';
import breakIntoWrap from './breakIntoWrap.js';

const colours = [
  '#79b43c',
  '#4a4a4a',
  '#ad3c64',
];


export default function LineGroupItem({ totalGroupSpace, groupSpaceArray, rank, lines, title, styling }) {
  const {
    barWidth,
    padding,
    buffer,
    valueSpace,
    lineGutter,
    maxValue,
    groupMargin,
    charWrap,
    charLineHeight,
  } = styling;

  const previousSpace = groupSpaceArray.reduce(
    (result, val, index) => {
      if (index < rank) {
        return result + val;
      }

      return result;
    },
    0,
  );

  const startPoint = padding[0] + previousSpace;
  const rawCharArray = breakIntoWrap(title, charWrap);
  const charArray = rawCharArray.filter(val => val !== '');

  return (
    <g className="Graph-group">
      {/* <rect
        x={padding[3] + buffer}
        y={padding[0] + previousSpace}
        width={valueSpace - buffer}
        height={groupSpace}
        fill="none"
        stroke="red"
        opacity="1"
      /> */}

      {
        charArray.map((val, index) => {
          return (
            <g key={index}>
              <text
                className="Graph-label Graph-label--leftAlign"
                y={padding[0] + previousSpace + (groupMargin / 2) + (charLineHeight * index)}
                x={padding[3] + buffer}
                fontFamily="sans-serif"
                fontWeight="bold"
              >
                {val}
              </text>
            </g>
          );
        })
      }

      {
        lines.map((amount, index) => {
          const relativeAmount = ((amount / maxValue) * valueSpace) - barWidth;
          const displayAmount = relativeAmount < (barWidth * 2) ? (barWidth * 2) : relativeAmount;

          return (
            <g key={index}>
              <line
                strokeLinecap="round"
                strokeWidth={barWidth}
                y1={(groupMargin / 2) + startPoint + (index * (barWidth + lineGutter)) + (barWidth / 2) + (charLineHeight * charArray.length)}
                x1={padding[3] + buffer + (barWidth / 2)}
                y2={(groupMargin / 2) + startPoint + (index * (barWidth + lineGutter)) + (barWidth / 2) + (charLineHeight * charArray.length)}
                x2={(padding[3] + buffer + displayAmount) - barWidth}
                className="Graph-line"
                stroke={colours[index]}
              />
            </g>
          );
        })
      }

    </g>
  );
}
