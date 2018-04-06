import { h } from 'preact';
import BarChart from './../../universal/BarChart/index.jsx';
import Download from './../../universal/Download/index.jsx';
import Pseudoselect from './../../universal/PseudoSelect/index.jsx';
import shareSelections from './partials/shareSelections.json';
import Icon from './../../universal/Icon/index.jsx';
import Modal from './../../universal/Modal/index.jsx';


export default function ProgrammesChart(props) {
  const {
    items,
    width,
    mobile,
    hasNull,
    year,
    files,

    open,
    selected,
    modal,
  } = props;

  const {
    parentAction,
    changeAction,
    downloadAction,
    shareAction,
    closeModal,
    canvasAction,
  } = props;

  const noValues = (
    <ul className="u-margin0 u-paddingLeft20">
      {Object.keys(items).map(val => <li>{val}</li>)}
    </ul>
  );

  const withValues = (
    <BarChart
      name="programmes-chart"
      guides={!mobile}
      hover={!mobile}
      {...{ width, parentAction, items }}
    />
  );

  const downloadButton = (
    <button className="Button is-inline" onClick={downloadAction}>Download chart as image</button>
  );

  return (
    <div className="Section is-bevel" id="programmes-chart">
      <canvas ref={node => canvasAction(node)} style={{ display: 'none' }} />
      <Modal
        title="Share this link:"
        closeAction={closeModal}
        open={modal}
      >
        <a className="u-wordBreak u-wordBreak--breakAll" href={`${window.location.href}#programmes-chart`}>
          {`${window.location.href}#programmes-chart`}
        </a>
      </Modal>
      <div className="ProgrammesChart">
        <div className="ProgrammesChart-info">
          <div className="Section-card is-invisible">
            <div className="Page-subHeading">Programme budgets for {year}</div>
            <p>
              A department&#x27;s programmes are the activities that it spends money on during the financial year. Different programmes have different expenditure budgets, depending on their requirements and available finances. More detail on the programmes is available in the department's Estimates of National Expenditure (ENE) documents.
            </p>
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
