import { h } from 'preact';
import trimValues from './../../../../utilities/js/helpers/trimValues.js';


export default function TooltipItem({ styling, xTriggerPosition, xPosition, yPosition, amount, totalGroupSpace }) {
  const { barWidth, lineGutter, padding, popupWidth, popupHeight, popupFontSize } = styling;

  // const { popUpOffset } = styling;

  return (
    <g className="Graph-tooltip">

      {/* <rect
        x={xPosition - (popupWidth / 2)}
        y={yPosition + barWidth}
        width={popupWidth}
        height={popupHeight + popUpOffset}
        fill="blue"
        opacity="0.5"
      /> */}

      {/* <rect
        x={xPosition - ((barWidth + lineGutter) / 2)}
        y={0}
        width={barWidth + lineGutter}
        height={totalGroupSpace + padding[0]}
        fill="none"
        stroke="blue"
        opacity="0.5"
      /> */}

      <rect
        x={xPosition - ((barWidth + lineGutter) / 2)}
        x1={xTriggerPosition}
        y={0}
        width={barWidth + lineGutter}
        height={totalGroupSpace + padding[0]}
        opacity="0"
      />

      <rect
        rx="10"
        ry="10"
        className="Graph-tooltipBase"
        x={xPosition - (popupWidth / 2)}
        y={yPosition}
        width={popupWidth}
        height={popupHeight}
        fill="#79b43c"
      />

      <polygon
        className="Graph-triangle"
        points={`
          ${xPosition},
          ${yPosition + barWidth + popupHeight}
          ${xPosition + (barWidth / 2)},
          ${yPosition + popupHeight}
          
          ${xPosition - (barWidth / 2)},
          ${yPosition + popupHeight}
        `}
        fill="#79b43c"
      />

      <text
        x={xPosition}
        y={(yPosition + (popupHeight / 2) + (popupFontSize / 2)) - 2}
        font-size={popupFontSize}
        className="Graph-tooltipText"
        font-family="sans-serif"
        text-anchor="middle"
        fill="white"
      >
        {trimValues(amount)}
      </text>
    </g>
  );
}
