import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';
import Share from './../../universal/Share/index.jsx';
import Linkslist from '../LinksList/index.jsx';


export default function ProgrammesChart(props) {
  const {
    linksListArray,
    hasNull,
    items,
    year,
    downloadAction,
    canvasAction,
    sourceType,
  } = props;


  const noValues = (
    <ul className="u-margin0 u-paddingLeft20">
      {Object.keys(items).map(val => <li>{val}</li>)}
    </ul>
  );

  const withValues = (
    <ResponsiveChart
      type="bar"
      {...{ items }}
    />
  );

  const downloadButton = (
    <button className="Button is-inline" onClick={downloadAction}>Download chart as image (~170 KB)</button>
  );

  return (
    <div>
      <canvas ref={node => canvasAction(node)} style={{ display: 'none' }} />
      <div className="ProgrammesChart">
        <div className="ProgrammesChart-info">
          <div className="Section-card is-invisible">
            <div className="Page-subHeading">Programme budgets for {year}</div>
            <p>
              A department&#x27;s programmes are the activities that it spends money on during the financial year. Different programmes have different expenditure budgets, depending on their requirements and available finances. More detail on the programmes is available in the department's {sourceType} documents.
            </p>
          </div>
          <div className="u-marginLeft30">
            <Linkslist listArray={linksListArray} />
          </div>
          <div className="Section-card is-invisible">
            <div className="u-fontWeightBold u-marginBottom10">Share this chart:</div>
            <div className="ProgrammesChart-share">
              <Share anchor="programmes-chart" />
            </div>
          </div>
        </div>
        <div className="ProgrammesChart-chart">
          <div className="Section-card">
            {hasNull ? noValues : withValues}
          </div>
          <div className="Section-card is-invisible u-textAlignCenter u-paddingBottom0">
            {hasNull ? null : downloadButton}
          </div>
        </div>
      </div>
    </div>
  );
}
