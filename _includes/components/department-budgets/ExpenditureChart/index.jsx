import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';
import ChartDownload from './../../universal/ChartDownload/index.jsx';
import Radios from './../../department-budgets/Radios/index.jsx';


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
    <div className="Section is-bevel">
      <div className="Section-invisible u-paddingBottom0">
        <h2 className="Section-title">Expenditure changes over time</h2>
        <p>Budgeted expenditure for a department can increase or decrease from year to year. The official budget shows the nominal value of spendiing - the real value is calculated by adjusting for inflation, since most expenditure items are subject to inflation.</p>

        <p>By stripping out the inflation (GDP or CPI inflation) it is possible to show if a departmental budget is increasing or decreasing in real terms.</p>
      </div>
      <div className="Section-card u-paddingTop10">
        <ResponsiveChart
          max={690}
          offset={170}
          values={sourceItems}
          downloadable
          name="programmes-chart"
          columns={500}
        />
        <div className="u-textAlignCenter u-marginTop20">
          <Radios
            items={sourceRadios}
            selected={sourceSelected}
            changeAction={changeSourceAction}
            name="expenditure-chart-source-toggle"
          />
        </div>
      </div>
      <div className="Section-invisible">
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
