import React from 'react';
import trimValues from './trimValues.js';


export default function TooltipItem({ styling, xTriggerPosition, xPosition, yPosition, amount, colour, totalGroupSpace }) {

  const { barWidth, popUpOffset, buffer, valueSpace, lineGutter, padding, popupWidth, popupHeight, popupFontSize, popupCentre } = styling;

  return (
    <g className="ReactBartChart-tooltip">

      {/* <rect
        x={xPosition}
        y={yPosition - ((popupHeight) / 2)}
        width={popupWidth + popUpOffset}
        height={popupHeight}
        fill="blue"
        opacity="0.5"
      />

      <rect
        x={padding[3] + buffer}
        y={yPosition - ((barWidth + lineGutter) / 2)}
        width={(valueSpace + padding[0]) - buffer}
        height={barWidth + lineGutter}
        fill="none"
        stroke="blue"
        opacity="0.5"
      /> */}

      <rect
        x={padding[3] + buffer}
        y={yPosition - ((barWidth + lineGutter) / 2)}
        width={(valueSpace + padding[0]) - buffer}
        height={barWidth + lineGutter}
        opacity="0"
      />

      <polygon
        className="ReactBartChart-triangle"
        points={`
          ${xPosition + popUpOffset},
          ${yPosition}

          ${xPosition + 6 + popUpOffset},
          ${yPosition - 6}

          ${xPosition + barWidth + popUpOffset},
          ${yPosition - 6}

          ${xPosition + barWidth + popUpOffset},
          ${yPosition + 6}
          
          ${xPosition + 6 + popUpOffset},
          ${yPosition + 6}
        `}
        fill={colour}
      />

      <rect
        rx="10"
        ry="10"
        className="ReactBartChart-tooltipBase"
        x={xPosition + 6 + popUpOffset}
        y={yPosition - ((popupHeight) / 2)}
        width={popupWidth}
        height={popupHeight}
        fill={colour}
      />

      <text
        x={xPosition + (popupWidth / 2) + popUpOffset + (barWidth / 2)}
        y={yPosition + popupCentre}
        fontSize={popupFontSize}
        className="ReactBartChart-tooltipText"
        fontFamily="sans-serif"
        textAnchor="middle"
        fill="white"
      >
        {trimValues(amount)}
      </text>
    </g>
  );
}
