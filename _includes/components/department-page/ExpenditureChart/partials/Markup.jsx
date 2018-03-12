import { h } from 'preact';
import ResponsiveChart from './../../../universal/ResponsiveChart/index.jsx';
import ChartDownload from './../../../universal/ChartDownload/index.jsx';
import Radios from './../../../universal/Radios/index.jsx';


export default function ProgrammesChart(props) {
  const {
    selected,
    changeAction,
    name,
    open,
    canvasAction,
    clickAction,
    downloadItems,
    closeModal,
    modal,
    sourceItems,
    hasNull,
    year,
    sources,
    sourceSelected,
    changeSourceAction,
  } = props;

  const sourceRadios = sources.reduce(
    (results, key) => {
      return {
        ...results,
        [key]: key,
      };
    },
    {},
  );

  return (
    <div className="Page-sectionWrap Page-sectionWrap--card Page-sectionWrap--dark">
      <div className="Page-section u-paddingBottom u-paddingBottom--0">
        <h2 className="Page-subHeading">Expenditure changes over time</h2>
        <p>Budgeted expenditure for a department can increase or decrease from year to year. The official budget shows the nominal value of spendiing - the real value is calculated by adjusting for inflation, since most expenditure items are subject to inflation.</p>

        <p>By stripping out the inflation (GDP or CPI inflation) it is possible to show if a departmental budget is increasing or decreasing in real terms.</p>
      </div>
      <div className="Page-section Page-section--card u-paddingTop u-paddingTop--10">
        <ResponsiveChart
          max={690}
          offset={170}
          values={sourceItems}
          downloadable
          name="programmes-chart"
          columns={500}
        />
        <div className="u-textAlign u-textAlign--center u-marginTop u-marginTop--20">
          <Radios
            items={sourceRadios}
            selected={sourceSelected}
            changeAction={changeSourceAction}
            name="expenditure-chart-source-toggle"
          />
        </div>
      </div>
      <div className="Page-section">
        <ChartDownload
          selected={this.props.downloadSelected}
          changeAction={this.props.changeAction}
          name="expenditure-chart"
          open={this.props.open}
          canvasAction={this.props.canvasAction}
          clickAction={this.props.clickAction}
          items={this.props.downloadItems}
          closeModal={this.props.closeModal}
          modal={this.props.modal}
        />
      </div>
    </div>
  );
}
