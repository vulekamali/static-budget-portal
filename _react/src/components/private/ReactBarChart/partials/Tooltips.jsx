import React from 'react';
import TooltipGroup from './TooltipGroup.jsx';


export default function Tooltips({ totalGroupSpace, groupSpaceArray, items, styling }) {
  const titles = Object.keys(items);

  return (
    <g className="LineGroupList">
      {/* <rect
        x={padding[3] + buffer}
        y={padding[0]}
        width={valueSpace - buffer}
        height={totalGroupSpace}
        fill="red"
        opacity="0.5"
      /> */}

      {
        titles.map((key, index) => {
          return (
            <g key={index}>
              <TooltipGroup
                rank={index}
                lines={items[key]}
                title={key}
                {...{ totalGroupSpace, groupSpaceArray, styling, items }}
              />
            </g>
          );
        })
      }
    </g>
  );
}
