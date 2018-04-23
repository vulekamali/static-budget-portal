import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';
import Download from './../../universal/Download/index.jsx';
import shareSelections from './partials/shareSelections.json';
import Share from './../../universal/Share/index.jsx';


export default function ProgrammesChart(props) {
  const {
    hasNull,
    width,
    mobile,
    items,
    files,
    year,
    deptLocation,
    downloadAction,
    canvasAction,
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
    <button className="Button is-inline" onClick={downloadAction}>Download chart as image</button>
  );

  const buildDownloadLinks = () => {
    Object.keys(files).map((key) => {
      return (
        <div>
          <Download title={key} link={files[key]} icon />
        </div>
      );
    });
  };

  const estimateText = location === 'National' ?
    'Estimates of National Expenditure (ENE)' :
    'Estimates of Provincial Revenue and Expenditure (EPRE)';

  return (
    <div className="Section is-bevel" id="programmes-chart">
      <canvas ref={node => canvasAction(node)} style={{ display: 'none' }} />
      <div className="ProgrammesChart">
        <div className="ProgrammesChart-info">
          <div className="Section-card is-invisible">
            <div className="Page-subHeading">Programme budgets for {year}</div>
            <p>
              A department&#x27;s programmes are the activities that it spends money on during the financial year. Different programmes have different expenditure budgets, depending on their requirements and available finances. More detail on the programmes is available in the department's {estimateText} documents.
            </p>
          </div>
          <div className="Section-card is-invisible">
            <div className="u-fontWeightBold">Sources</div>
            <p>
              The {estimateText} sets out the detailed spending plans of each government department for the coming year.
            </p>
            { files ? buildDownloadLinks : null }
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
          <div className="Section-card is-invisible u-textAlignCenter">
            {hasNull ? null : downloadButton}
          </div>
        </div>
      </div>
    </div>
  );
}
