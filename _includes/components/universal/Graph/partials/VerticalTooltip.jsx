import { h } from 'preact';
import trimValues from './trimValues.js';


export default function VerticalTooltip({ styling, xTriggerPosition, xPosition, yPosition, amount, totalGroupSpace }) {

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
      />

      <text
        x={xPosition}
        y={yPosition + (popupHeight / 2) + (popupFontSize / 2)}
        font-size={popupFontSize}
        className="Graph-tooltipText"
        font-family="sans-serif"
      >
        {trimValues(amount)}
      </text>
    </g>
  );
}
