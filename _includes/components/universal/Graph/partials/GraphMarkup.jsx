import { h } from 'preact';
import render from 'preact-render-to-string';
import buildGroupSpaceArray from './buildGroupSpaceArray.js';
import VerticalBreakpointsList from './VerticalBreakpointsList.jsx';
import HorisontalBreakpointsList from './HorisontalBreakpointsList.jsx';
import HorisontalLabelList from './HorisontalLabelList.jsx';
import Grid from './Grid.jsx';
import VerticalLineGroupList from './VerticalLineGroupList.jsx';
import VerticalGuidesList from './VerticalGuidesList.jsx';
import VerticalTooltipsList from './VerticalTooltipsList.jsx';
import HorisontalGuidesList from './HorisontalGuidesList.jsx';
import HorisontalLineGroupList from './HorisontalLineGroupList.jsx';
import VerticalLabelList from './VerticalLabelList.jsx';
import HorisontalTooltipsList from './HorisontalTooltipsList.jsx';
import PseudoSelect from './../../../universal/PseudoSelect/index.jsx';


const hardCoded = [
  {
    value: '1',
    title: 'Small',
  },
  {
    value: '2',
    title: 'Medium',
  },
  {
    value: '3',
    title: 'Large',
  },
];


const screenshotsProps = {
  small: {
    valueSpace: 1000,
    popupWidth: 90,
    popUpOffset: 6,
    buffer: 20,
    fontSize: 14,
    popupFontSize: 14,
    padding: [0, 100, 60, 0],
    lineGutter: 8,
    popupHeight: 30,
    popupCentre: 5,
    barWidth: 12,
    groupMargin: 40,
    charWrap: 65,
    charLineHeight: 14,
    titleSpace: 0,
    labelBreakpoints: 4,
  },
  medium: {
    valueSpace: 2000,
    popupWidth: 90,
    popUpOffset: 6,
    buffer: 20,
    fontSize: 14,
    popupFontSize: 14,
    padding: [0, 100, 60, 0],
    lineGutter: 8,
    popupHeight: 30,
    popupCentre: 5,
    barWidth: 12,
    groupMargin: 40,
    charWrap: 65,
    charLineHeight: 14,
    titleSpace: 0,
    labelBreakpoints: 4,
  },
  large: {
    valueSpace: 3000,
    popupWidth: 90 * 3,
    popUpOffset: 6 * 3,
    buffer: 20 * 3,
    fontSize: 14 * 3,
    popupFontSize: 14 * 3,
    padding: [0 * 3, 100 * 3, 60 * 3, 0 * 3],
    lineGutter: 8 * 3,
    popupHeight: 30 * 3,
    popupCentre: 5 * 3,
    barWidth: 12 * 3,
    groupMargin: 40 * 3,
    charWrap: 65 * 3,
    charLineHeight: 14 * 3,
    titleSpace: 0 * 3,
    labelBreakpoints: 4 * 3,
  },
};

export default function GraphMarkup({ items, styling, legend, year, addCanvas, downloadImage, open, setOpenState, selected, screenshotProps }) {
  const { valueSpace, padding, showGuides } = styling;
  const groupSpaceArray = buildGroupSpaceArray(items, styling);
  const totalGroupSpace = groupSpaceArray.reduce((result, val) => result + val, 0);
  const height = padding[0] + totalGroupSpace + padding[2];
  const width = padding[3] + valueSpace + padding[1];

  // const columnChart = (
  //   <g>
  //     <VerticalBreakpointsList {...{ styling, totalGroupSpace }} />
  //     <VerticalGuidesList {...{ styling, totalGroupSpace }} />

  //     <HorisontalLabelList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
  //     <Grid {...{ styling, totalGroupSpace }} />
  //     <VerticalLineGroupList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
  //     <VerticalTooltipsList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
  //   </g>
  // );


  const barChart = (
    <svg
      version="1.1"
      className="Graph-svg Graph-svg--responsive"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      {...{ width, height }}
      style={{ maxWidth: width }}
    >
      <HorisontalBreakpointsList {...{ styling, totalGroupSpace }} />
      <HorisontalGuidesList {...{ styling, totalGroupSpace }} />
      {showGuides ? <HorisontalGuidesList {...{ styling, totalGroupSpace }} /> : null}
      <HorisontalLineGroupList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <HorisontalTooltipsList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
    </svg>
  );

  const Screenshot = ({ stylingInput }) => {
    const stylingOverride = {
      ...styling,
      ...stylingInput,
    };

    const { valueSpace: newValueSpace, padding: newPadding } = stylingOverride;
    const newGroupSpaceArray = buildGroupSpaceArray(items, styling);
    const newTotalGroupSpace = groupSpaceArray.reduce((result, val) => result + val, 0);
    const newHeight = newPadding[0] + totalGroupSpace + newPadding[2];
    const newWidth = newPadding[3] + newValueSpace + newPadding[1];

    return (
      <svg
        version="1.1"
        className="Graph-svg Graph-svg--responsive"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${newWidth} ${newHeight}`}
        height={newHeight}
        width={newWidth}
        style={{ maxWidth: width }}
      >
        <HorisontalBreakpointsList styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} />
        <HorisontalGuidesList styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} />
        <Grid styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} />
        <HorisontalLineGroupList styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} groupSpaceArray={newGroupSpaceArray} items={items} />
        <HorisontalTooltipsList styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} groupSpaceArray={newGroupSpaceArray} items={items} />
      </svg>
    );
  };


  const download = (
    <div className="Graph-download">
      <span className="Graph-downloadTitle">Download Chart as PNG</span>
      <div className="Graph-downloadSelect">
        <PseudoSelect
          name="download-image"
          items={hardCoded}
          property={selected}
          open={open}
          changeAction={value => setOpenState(value)}
        />
      </div>
      <div className="Graph-downloadButton">
        <button className="Button" onClick={downloadImage}>Download</button>
      </div>
    </div>
  );

  const svg = render(<Screenshot stylingInput={screenshotsProps.large} />);

  return (
    <div>
      <canvas ref={node => addCanvas(node)} />
      {barChart}
      <button onClick={() => downloadImage(svg)}>DOWNLOAD</button>
    </div>
  );
}
