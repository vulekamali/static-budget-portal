import { h } from 'preact';
import VerticalTooltip from './VerticalTooltip.jsx';


export default function VerticalTooltips({ totalGroupSpace, groupSpaceArray, rank, lines, title, styling }) {
  const {
    barWidth,
    padding,
    buffer,
    lineGutter,
    valueSpace,
    maxValue,
    popUpOffset,
    popupHeight,
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

  const usedSpace = lines.length * (barWidth + lineGutter);
  const startPoint = padding[3] + buffer + previousSpace;
  const centeringSpace = ((generateToScale(groupSpace) + barWidth) - usedSpace) / 2;


  return (
    <g className="Graph-group">

      {/* <rect
        x={padding[3] + buffer + previousSpace}
        y={0}
        width={generateToScale(groupSpace)}
        height={totalGroupSpace + padding[0]}
        fill="none"
        stroke="red"
        opacity="1"
      /> */}

      {
        lines.map((amount, index) => {
          const relativeAmount = (amount / maxValue) * totalGroupSpace;
          const displayAmount = relativeAmount < barWidth + 1 ? barWidth + 1 : relativeAmount;

          return (
            <VerticalTooltip
              {...{ styling }}
              xPosition={startPoint + centeringSpace + (index * (barWidth + lineGutter))}
              yPosition={(padding[0] + totalGroupSpace + barWidth) - ((barWidth * 2) + displayAmount + popUpOffset + popupHeight)}
              {...{ amount, totalGroupSpace }}
            />
          );
        })
      }
    </g>
  );
}


/*

              y2={}

              */