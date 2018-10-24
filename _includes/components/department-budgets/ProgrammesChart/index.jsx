import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';
import Icon from '../../universal/Icon/index.jsx';
import Share from './../../universal/Share/index.jsx';


export default function ProgrammesChart(props) {
  const {
    hasNull,
    items,
    year,
    downloadAction,
    canvasAction,
    dataset,
    sourceType,
    guide,
    pdf,
    excel,
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

  const buildDataset = () => (
    <div>
      <a href={dataset} className="LinksList-item u-textDecorationNone">
        <span className="LinksList-icon"><Icon type="dataset" /></span>
        <span className="LinksList-title">
          <span>Source:&nbsp;</span>
          <span className="u-textDecorationUnderline">{sourceType} {year}</span>
        </span>
      </a>
    </div>
  );

  const buildGuide = () => (
    <div>
      <a href={guide} className="LinksList-item">
        <span className="LinksList-icon"><Icon type="guide" /></span>
        <span className="LinksList-title">Dataset Guide for {sourceType}</span>
      </a>
    </div>
  );

  const buildPdf = () => (
    <div>
      <a href={pdf} className="LinksList-item" target="_blank" rel="noopener noreferrer">
        <span className="LinksList-icon"><Icon type="download" /></span>
        <span className="LinksList-title">Learn more about these programmes in the { sourceType } as PDF</span>
      </a>
    </div>
  );

  const buildExcel = () => (
    <div>
      <a href={excel} className="LinksList-item" target="_blank" rel="noopener noreferrer">
        <span className="LinksList-icon"><Icon type="download" /></span>
        <span className="LinksList-title">Learn more about these programmes in the { sourceType } as Excel</span>
      </a>
    </div>
  );

  return (
    <div className="Section is-bevel">
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
            {dataset && buildDataset()}
            {guide && buildGuide()}
            {pdf && buildPdf()}
            {excel && buildExcel()}
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
