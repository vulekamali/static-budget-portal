import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';
import Download from './../../universal/Download/index.jsx';
import shareSelections from './partials/shareSelections.json';
import Share from './../../universal/Share/index.jsx';


export default function ExpenditureChart(props) {
  const {
    items,

    year,
    files,
    location,
    phaseTable,

    width,
    mobile,
    source,
    type,
    cpi,

    downloadAction,
    canvasAction,
    widthAction,
    changeSource,
  } = props;


  const estimateText = location === 'National' ?
    'Estimates of National Expenditure (ENE)' :
    'Estimates of Provincial Revenue and Expenditure (EPRE)';

  return (
    <div className="Section is-bevel" id="line-chart">
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
          <div className="Section-card is-invisible">
            <div className="u-fontWeightBold">Sources</div>
            <p>
              The {estimateText} sets out the detailed spending plans of each government department for the coming year. These documents use amounts not adjusted for inflation unless stated otherwise.
            </p>
            {
              Object.keys(files).map((key) => {
                return (
                  <div>
                    <Download title={key} link={files[key]} icon />
                  </div>
                );
              })
            }
            <div>
              <Download title="Annual CPI Inflation 2018-19 (Excel)" link={cpi} icon />
            </div>
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
            <ResponsiveChart {...{ items, widthAction, type }} />
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
            <button className="Button is-inline" onClick={downloadAction}>Download chart as image</button>
          </div>
        </div>
      </div>
    </div>
  );
}
