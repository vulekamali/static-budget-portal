import { h } from 'preact';
import calcMaxValue from './partials/calcMaxValue.js';
import buildGroupSpaceArray from './partials/buildGroupSpaceArray.js';

import Breakpoints from './partials/Breakpoints.jsx';
import Grid from './partials/Grid.jsx';
import Guides from './partials/Guides.jsx';
import LineGroups from './partials/LineGroups.jsx';
import Tooltips from './partials/Tooltips.jsx';
import Labels from './partials/Labels.jsx';

export default function LineChart({ items, width, guides, scale = 1, downloadable, parentAction }) {
  let styling = {
    fontSize: 14,
    popupFontSize: 14,
    maxValue: calcMaxValue(items),
    popupWidth: 90,
    popUpOffset: 6,
    buffer: 20,
    valueSpace: width - (0 + 100),
    padding: [50, 0, 30, 100],
    popupHeight: 30,
    popupCentre: 5,
    charWrap: width / 10,
    titleSpace: 0,
    labelBreakpoints: 4,
    showGuides: true,
    charLineHeight: 14,
    lineGutter: 8,
    barWidth: 12,
    groupMargin: 40,
    svgHeight: 300,
  };

  if (downloadable) {
    styling = {
      ...styling,
      padding: [80, 30, 60, 130],
      valueSpace: width - (30 + 130),
    };
  }

  const { valueSpace, padding, showGuides, svgHeight, buffer } = styling;
  const groupSpaceArray = buildGroupSpaceArray(items, styling);
  const totalGroupSpace = groupSpaceArray.reduce((result, val) => result + val, 0);
  const height = padding[0] + svgHeight + padding[2] + (buffer * 2);
  const newWidth = padding[3] + valueSpace + padding[1];

  const background = (
    <rect
      x="0"
      y="0"
      width={newWidth}
      height={height}
      fill="white"
    />
  );

  const values = (
    <svg
      version="1.1"
      className="ColumnChart-svg is-hoverable"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${newWidth} ${height}`}
      width={newWidth * scale}
      height={height * scale}
      style={{ maxWidth: newWidth }}
    >

      {downloadable ? background : null}

      <Breakpoints {...{ styling, totalGroupSpace }} />
      <Grid {...{ styling, totalGroupSpace }} />
      <Guides {...{ styling, totalGroupSpace }} />
      <LineGroups {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <Tooltips {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <Labels {...{ totalGroupSpace, groupSpaceArray, items, styling }} /> */}
    </svg>
  );

  if (!downloadable) {
    return (
      <div
        className="ColumnChart"
        ref={parentAction && node => parentAction(node)}
      >
        {values}
      </div>
    );
  }

  return values;
}
