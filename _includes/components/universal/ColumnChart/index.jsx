import { h } from 'preact';
import calcMaxValue from './partials/calcMaxValue.js';
import buildGroupSpaceArray from './partials/buildGroupSpaceArray.js';

import Breakpoints from './partials/Breakpoints.jsx';
import Grid from './partials/Grid.jsx';
import Guides from './partials/Guides.jsx';
import LineGroups from './partials/LineGroups.jsx';
import Tooltips from './partials/Tooltips.jsx';


export default function ColumnChart({ items, width, hover, guides, scale = 1, downloadable }) {
  let styling = {
    fontSize: 14,
    popupFontSize: 14,
    maxValue: calcMaxValue(items),
    popupWidth: 90,
    popUpOffset: 6,
    buffer: 20,
    valueSpace: width - 110,
    padding: [0, 110, 60, 0],
    lineGutter: 23,
    popupHeight: 30,
    popupCentre: 5,
    barWidth: 16,
    groupMargin: 60,
    charWrap: width / 10,
    charLineHeight: 16,
    titleSpace: 0,
    labelBreakpoints: Math.floor(width / 150),
    showGuides: true,
  };

  if (hover) {
    styling = {
      ...styling,
      charLineHeight: 14,
      lineGutter: 8,
      barWidth: 12,
      groupMargin: 40,
    };
  }

  if (downloadable) {
    styling = {
      ...styling,
      padding: [30, 140, 90, 30],
    };
  }

  const { valueSpace, padding, showGuides } = styling;
  const groupSpaceArray = buildGroupSpaceArray(items, styling);
  const totalGroupSpace = groupSpaceArray.reduce((result, val) => result + val, 0);
  const height = padding[0] + totalGroupSpace + padding[2];
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

  return (
    <svg
      version="1.1"
      className={`Graph-svg${hover ? ' is-hoverable' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${newWidth} ${height}`}
      width={newWidth * scale}
      height={height * scale}
      style={{ maxWidth: newWidth }}
    >

      {downloadable ? background : null}

      {width > 300 ? <Breakpoints {...{ styling, totalGroupSpace }} /> : null}
      <Grid {...{ styling, totalGroupSpace }} />
      {guides ? <Guides {...{ styling, totalGroupSpace }} /> : null}
      <LineGroups {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <Tooltips {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
    </svg>
  );
}
