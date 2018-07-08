import React from 'react';
import calcMaxValue from './partials/calcMaxValue.js';
import buildGroupSpaceArray from './partials/buildGroupSpaceArray';

import Breakpoints from './partials/Breakpoints';
import Grid from './partials/Grid';
import Guides from './partials/Guides';
import LineGroups from './partials/LineGroups';
import Tooltips from './partials/Tooltips';
import Labels from './partials/Labels';
import ReactLoader from './../ReactLoader';
import './styles.css';


export default function ReactLineChart(props) {
  const {
    items,
    width,
    hover
  } = props;

  const { getNode } = props;


  if (!width) {
    return (
      <div className="ReactLineChart" ref={node => getNode && getNode(node)}>
          <ReactLoader />
      </div>
    );
  }


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

  if (hover) {
    styling = {
      ...styling,
      padding: [80, 30, 60, 130],
      valueSpace: width - (30 + 130),
    };
  }

  const { valueSpace, padding, svgHeight, buffer } = styling;
  const groupSpaceArray = buildGroupSpaceArray(items, styling);
  const totalGroupSpace = groupSpaceArray.reduce((result, val) => result + val, 0);
  const height = padding[0] + svgHeight + padding[2] + (buffer * 2);
  const newWidth = padding[3] + valueSpace + padding[1];

  const content = (
    <svg
      version="1.1"
      className="ColumnChart-svg is-hoverable"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${newWidth} ${height}`}
      width={newWidth}
      height={height}
      style={{ maxWidth: newWidth }}
    >
      <Breakpoints {...{ styling, totalGroupSpace }} />
      <Grid {...{ styling, totalGroupSpace }} />
      <Guides {...{ styling, totalGroupSpace }} />
      <LineGroups {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <Tooltips {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <Labels {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
    </svg>
  );

  return (
    <div
      className="ReactLineChart"
      ref={node => getNode && getNode(node)}
    >
      {content}
    </div>
  );
}
