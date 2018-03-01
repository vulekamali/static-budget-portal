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
import Modal from './../../../universal/Modal/index.jsx';

const hardCoded = [
  {
    value: '1',
    title: 'Image (PNG Small)',
  },
  {
    value: '2',
    title: 'Image (PNG Medium)',
  },
  {
    value: '3',
    title: 'Image (PNG Large)',
  },
  {
    value: 'link',
    title: 'Link',
  },
];


const screenshotsProps = {
  valueSpace: 600,
  popupWidth: 90,
  popUpOffset: 6,
  buffer: 20,
  fontSize: 14,
  popupFontSize: 14,
  padding: [30, 140, 90, 30],
  lineGutter: 8,
  popupHeight: 30,
  popupCentre: 5,
  barWidth: 12,
  groupMargin: 40,
  charWrap: 65,
  charLineHeight: 14,
  titleSpace: 0,
  labelBreakpoints: 4,
};

export default function GraphMarkup({ items, styling, legend, year, addCanvas, downloadImage, open, setOpenState, selected, screenshotProps, linkModal, closeModal }) {
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
      <Grid {...{ styling, totalGroupSpace }} />
      {showGuides ? <HorisontalGuidesList {...{ styling, totalGroupSpace }} /> : null}
      <HorisontalLineGroupList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
      <HorisontalTooltipsList {...{ totalGroupSpace, groupSpaceArray, items, styling }} />
    </svg>
  );

  const Screenshot = ({ stylingInput, scale }) => {
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
        height={newHeight * scale}
        width={newWidth * scale}
        style={{ maxWidth: width }}
      >

        <rect
          x="0"
          y="0"
          width={newWidth}
          height={newHeight}
          fill="white"
        />

        <HorisontalBreakpointsList styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} />
        <HorisontalGuidesList styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} />
        <Grid styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} />
        <HorisontalLineGroupList styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} groupSpaceArray={newGroupSpaceArray} items={items} />
        <HorisontalTooltipsList styling={stylingOverride} totalGroupSpace={newTotalGroupSpace} groupSpaceArray={newGroupSpaceArray} items={items} />
      </svg>
    );
  };


  const svg = render(<Screenshot stylingInput={screenshotsProps} scale={selected} />);
  const downloadEvent = () => downloadImage(svg);


  const download = (
    <div className="Graph-download">
      <span className="Graph-downloadTitle">Save or share</span>
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
        <button onClick={downloadEvent} className="Button has-icon">
          <svg version="1.2" width="14" height="14" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="M93.3 25C88.8 17 82.8 11 75 6.6 67.5 2.2 59 0 50 0S32.6 2.2 25 6.7C17 11.2 11 17.2 6.6 25 2.2 32.5 0 41 0 50s2.2 17.4 6.7 25C11.2 83 17.2 89 25 93.4c7.6 4.5 16 6.7 25 6.7s17.4-2.2 25-6.7C83 88.8 89 82.8 93.4 75c4.5-7.6 6.7-16 6.7-25s-2.2-17.4-6.7-25zM82.5 53l-6 5.8L53 82.4c-.8.8-1.8 1.2-3 1.2-1 0-2-.4-2.8-1.2l-6-6c-.7-.7-1-1.7-1-2.8 0-1 .3-2 1-3l12.4-12.2H20.8c-1 0-2-.4-3-1.2-.7-.8-1-1.8-1-3V46c0-1 .3-2 1-3 1-.7 2-1 3-1h32.7L41.2 29.3c-.8-.8-1.2-1.8-1.2-3 0-1 .4-2 1.2-2.8l6-6c.7-.7 1.7-1 2.8-1 1.2 0 2 .3 3 1l23.5 23.7 6 6c.7.7 1 1.7 1 2.8.2 1.2-.2 2-1 3zm0 0" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal title="Share this link:" closeAction={closeModal} open={linkModal}>
        <a className="u-wordBreak u-wordBreak--breakAll" href={window.location.href}>
          {window.location.href}
        </a>
      </Modal>
      <canvas ref={node => addCanvas(node)} style={{ display: 'none' }} />
      {barChart}
      {download}
    </div>
  );
}
