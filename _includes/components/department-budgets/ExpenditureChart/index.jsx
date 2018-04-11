import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';
import Download from './../../universal/Download/index.jsx';
import Pseudoselect from './../../universal/PseudoSelect/index.jsx';
import shareSelections from './partials/shareSelections.json';
import Icon from './../../universal/Icon/index.jsx';
import Modal from './../../universal/Modal/index.jsx';


export default function ExpenditureChart(props) {
  const {
    items,
    hasNull,
    year,
    files,
    phaseTable,
    type,

    open,
    selected,
    modal,
  } = props;

  const {
    changeAction,
    downloadAction,
    shareAction,
    closeModal,
    canvasAction,
    widthAction,
  } = props;


  return (
    <div className="Section is-bevel" id="line-chart">
      <canvas ref={node => canvasAction(node)} style={{ display: 'none' }} />
      <Modal
        title="Share this link:"
        closeAction={closeModal}
        open={modal}
      >
        <a className="u-wordBreak u-wordBreak--breakAll" href={`${window.location.href}#programmes-chart`}>
          {`${window.location.href}#line-chart`}
        </a>
      </Modal>
      <div className="ProgrammesChart">
        <div className="ProgrammesChart-info">
          <div className="Section-card is-invisible">
            <div className="Page-subHeading">Expenditure changes over time</div>
            <p>
            Budgeted expenditure for a department can increase or decrease from year to year. The official budget shows the nominal value of spendiing - the real value is calculated by adjusting for inflation, since most expenditure items are subject to inflation. By stripping out the inflation (GDP or CPI inflation) it is possible to show if a departmental budget is increasing or decreasing in real terms
            </p>
            <div>
              <span>Previous financial years indicate actual expenditure while upcoming financial years indicate estimated expenditure:</span>
              <table className="Expenditure-table">
                <tr>
                  <th className="Expenditure-heading">Financial year</th>
                  <th className="Expenditure-heading">Budget phase</th>
                </tr>
                {
                  phaseTable.map((val) => {
                    return (
                      <tr>
                        <td className="Expenditure-cell">{val[0]}</td>
                        <td className="Expenditure-cell">{val[1]}</td>
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
              The Estimates of National Expenditure (ENE) sets out the detailed spending plans of each government department for the coming year.
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
          </div>
          <div className="Section-card is-invisible">
            <div className="u-fontWeightBold u-marginBottom10">Share this chart:</div>
            <div className="ProgrammesChart-share">
              <div className="ProgrammesChart-shareDropdown">
                <Pseudoselect
                  name={`${name}-share-selection`}
                  items={shareSelections}
                  {...{ open, selected, changeAction }}
                />
              </div>
              <div className="ProgrammesChart-shareButton u-marginLeft5">
                <button onClick={shareAction} className="Button is-inline has-icon u-transformRotate270">
                  <Icon type="download" size="small" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ProgrammesChart-chart">
          <div className="Section-card">
            <ResponsiveChart {...{ items, widthAction, type }} />
          </div>
        </div>
      </div>
    </div>
  );
}
