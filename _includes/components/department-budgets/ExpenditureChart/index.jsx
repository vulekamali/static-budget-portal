import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';
import Icon from './../../universal/Icon/index.jsx';
import Share from './../../universal/Share/index.jsx';


export default function ExpenditureChart(props) {
  const {
    items,
    phaseTable,
    sourceType,
    year,
    guide,
    excel,
    pdf,

    source,
    type,
    cpi,
    dataset,

    downloadAction,
    canvasAction,
    resizeAction,
    changeSource,
  } = props;

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


  const buildCpi = () => (
    <div>
      <a href={cpi} className="LinksList-item" target="_blank" rel="noopener noreferrer">
        <span className="LinksList-icon"><Icon type="download" /></span>
        <span className="LinksList-title">Annual CPI Inflation {year} as Excel document</span>
      </a>
    </div>
  );


  return (
    <div className="Section is-bevel">
      <canvas ref={node => canvasAction(node)} style={{ display: 'none' }} />
      <div className="ExpenditureChart">
        <div className="ExpenditureChart-info">
          <div className="Section-card is-invisible">
            <div className="Page-subHeading">Actual and planned expenditure changes over time</div>
            <p className="js-tooltips">
              Budgeted and actual expenditure/allocations for a department can increase or decrease from year to year. Changes in expenditure for a department can be because of changes in the activities of the department, because of changes in priorities between departments, because of cost efficiencies or because of increases in the price of goods and services due to inflation.
            </p>
            <p className="js-tooltips">
              The chart shows the department’s actual expenditure for past years, and budgeted expenditure for the current year and the upcoming three years of the medium-term expenditure framework (MTEF). By adjusting these numbers to take inflation into account, it is possible to determine if a department’s expenditure is really increasing or decreasing in real terms, as compared to the rest of the economy.
            </p>
            <div>
              <span>Previous financial years indicate actual expenditure while upcoming financial years indicate estimated expenditure:</span>
              <table className="ExpenditureChart-table">
                <tr>
                  <th className="ExpenditureChart-heading">Financial year</th>
                  <th className="ExpenditureChart-heading">Budget phase</th>
                </tr>
                {
                  phaseTable.map((val) => {
                    return (
                      <tr>
                        <td className="ExpenditureChart-cell">{val[0]}</td>
                        <td className="ExpenditureChart-cell">{val[1]}</td>
                      </tr>
                    );
                  })
                }
              </table>
            </div>
          </div>
          <div className="u-marginLeft30">
            {dataset && buildDataset()}
            {guide && buildGuide()}
            {pdf && buildPdf()}
            {excel && buildExcel()}
            {cpi && buildCpi()}
          </div>
          <div className="Section-card is-invisible">
            <div className="u-fontWeightBold u-marginBottom10">Share this chart:</div>
            <div className="ExpenditureChart-share">
              <Share anchor="line-chart" />
            </div>
          </div>
        </div>
        <div className="ExpenditureChart-chart">
          <div className="Section-card">
            <ResponsiveChart {...{ items, resizeAction, type }} />
            <div className="u-textAlignCenter">
              <label htmlFor="expenditure-select-adjusted" className="ExpenditureChart-radio u-marginRight20">
                <input
                  type="radio"
                  id="expenditure-select-adjusted"
                  name="expenditure-select"
                  value="adjusted"
                  checked={source === 'adjusted'}
                  onChange={event => changeSource(event.target.value)}
                />
                <span className="u-displayInlineBlock u-marginLeft10">Adjusted for Inflation</span>
              </label>
              <label htmlFor="expenditure-select-not-adjusted" className="ExpenditureChart-radio">
                <input
                  type="radio"
                  id="expenditure-select-not-adjusted"
                  name="expenditure-select"
                  value="notAdjusted"
                  checked={source === 'notAdjusted'}
                  onChange={event => changeSource(event.target.value)}
                />
                <span className="u-displayInlineBlock u-marginLeft10">Not adjusted for inflation</span>
              </label>
            </div>
            {
              source === 'adjusted' ?
                <p className="ExpenditureChart-inflation"><em>
                  The Rand values in this chart are adjusted for CPI inflation and are the effective value in 2017 Rands. CPI is used as the deflator, with the 2017-18 financial year as the base.
                </em></p> :
                ''
            }
          </div>
          <div className="Section-card is-invisible u-textAlignCenter">
            <button className="Button is-inline" onClick={downloadAction}>Download chart as image (~130 KB)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
