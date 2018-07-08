import React from 'react';
import calcMaxValue from './partials/calcMaxValue';
import buildGroupSpaceArray from './partials/buildGroupSpaceArray';
import breakIntoWrap from './partials/breakIntoWrap';

import Breakpoints from './partials/Breakpoints';
import Grid from './partials/Grid';
import Guides from './partials/Guides';
import LineGroups from './partials/LineGroups';
import Tooltips from './partials/Tooltips';
import Attribution from './partials/Attribution';
import Heading from './partials/Heading';
import Logo from './partials/Logo';
import ReactLoader from './../../private/ReactLoader';
import './styles.css';


export default function ReactBartChart(props) {
  const {
    items,
    width,
    hover,
    guides,
    scale = 1,
    ReactDownload,
  } = props;

  const { getNode } = props;

  if (!width) {
    return (
      <div className="ReactLineChart" ref={node => getNode && getNode(node)}>
        <ReactLoader />
      </div>
    );
  }

  let content = null;

  let styling = {
    fontSize: 14,
    popupFontSize: 14,
    maxValue: calcMaxValue(items),
    popupWidth: 90,
    popUpOffset: 6,
    buffer: 20,
    padding: [0, 110, 60, 2],
    valueSpace: width - (112),
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

  if (ReactDownload) {
    const titleArray = breakIntoWrap(ReactDownload.heading, 33);

    styling = {
      ...styling,
      padding: [83 + (30 * titleArray.length), 140, 137, 30],
      valueSpace: width - (140 + 30),
    };
  }

  if (width > 200) {
    const { valueSpace, padding } = styling;
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

    content = (
      <svg
        version="1.1"
        className={`ReactBartChart-svg ${hover ? ' is-hoverable' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${newWidth} ${height}`}
        width={newWidth * (scale || 1)}
        height={height * (scale || 1)}
        style={{ maxWidth: newWidth * (scale || 1) }}
      >

        {ReactDownload ? background : null}

        { ReactDownload ?
          <Heading
            left={padding[3]}
            heading={ReactDownload.heading}
            subReactHeading={ReactDownload.subReactHeading}
            type={ReactDownload.type}
          /> :
          null
        }

        {width > 300 ? <Breakpoints {...{ styling, totalGroupSpace }} /> : null}
        <Grid {...{ styling, totalGroupSpace }} />
        {guides ? <Guides {...{ styling, totalGroupSpace }} /> : null}
        <LineGroups {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
        <Tooltips {...{ totalGroupSpace, groupSpaceArray, items, styling }} />

        { ReactDownload ?
          <g>
            <Logo top={((padding[0] + totalGroupSpace) / 2) + 17} left={padding[3]} />
            <Attribution top={padding[0] + totalGroupSpace + 90} left={padding[3] + valueSpace} />
          </g> :
          null
        }
      </svg>
    );
  }

  if (!ReactDownload) {
    return (
      <div
        className="ReactBartChart"
        ref={node => getNode && getNode(node)}
      >
        {content}
      </div>
    );
  }

  return content;
}
