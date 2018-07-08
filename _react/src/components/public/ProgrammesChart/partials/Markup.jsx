import React from 'react';
import ReactResponsiveChart from './../../../private/ReactResponsiveChart';
import ReactShare from './../../../private/ReactShare';
import ReactCard from './../../../private/ReactCard';


export default function Markup(props) {
  const {
    hasNull,
    items,
    files,
    year,
    downloadAction,
    canvasAction,
    national,
  } = props;


  const noValues = (
    <ul className="u-margin0 u-paddingLeft20">
      {Object.keys(items).map((val, key) => <li {...{ key }}>{val}</li>)}
    </ul>
  );

  const withValues = (
    <ReactResponsiveChart
      type="bar"
      {...{ items }}
    />
  );

  const downloadButton = (
    <button className="ReactButton is-inline" onClick={downloadAction}>Download chart as image (~170 KB)</button>
  );

  const buildDownloadLinks = () => {
    return Object.keys(files).map((key) => {
      return (
        <li {...{ key }}>
          <a href={files[key]} target="_blank">{key}</a>
        </li>
      );
    });
  };

  const estimateText = national ?
    'Estimates of National Expenditure (ENE)' :
    'Estimates of Provincial Revenue and Expenditure (EPRE)';

  return (
    <div className="ProgrammesChart">
      <canvas ref={node => canvasAction(node)} style={{ display: 'none' }} />
      <div className="ProgrammesChart-inner">
        <div className="ProgrammesChart-info">

            <div className="ProgrammesChart-subHeading">Programme budgets for {year}</div>
            <p>
              A department&#x27;s programmes are the activities that it spends money on during the financial year. Different programmes have different expenditure budgets, depending on their requirements and available finances. More detail on the programmes is available in the department's {estimateText} documents.
            </p>


            <div className="u-fontWeightBold">Sources</div>
            <p>
              The {estimateText} sets out the detailed spending plans of each government department for the coming year.
            </p>
            <ul>
              { files ? buildDownloadLinks() : null }
            </ul>

            <div className="u-fontWeightBold u-marginBottom10 u-mt-6">Share this chart:</div>
            <div className="ProgrammesChart-share">
              <ReactShare anchor="programmes-chart" />
            </div>

        </div>
        <div className="ProgrammesChart-chart">
          <ReactCard auto>
            {hasNull ? noValues : withValues}
          </ReactCard>
          <div className="Section-ReactCard is-invisible u-textAlignCenter u-mt-6 u-mb-4">
            {!hasNull && downloadButton}
          </div>
        </div>
      </div>
    </div>
  );
}
