import { h } from 'preact';
import ResponsiveChart from './../../../universal/ResponsiveChart/index.jsx';
import ChartDownload from './../../../universal/ChartDownload/index.jsx';
import Download from './../../../universal/Download/index.jsx';


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
    files,
  } = props;

  const noValues = (
    <ul className="u-margin u-margin--0 u-paddingLeft u-paddingLeft--20">
      {Object.keys(sourceItems).map(val => <li>{val}</li>)}
    </ul>
  );

  const withValues = (
    <ResponsiveChart
      max={690}
      offset={150}
      values={sourceItems}
      downloadable
      name="programmes-chart"
    />
  );

  const downloadPrompt = (
    <div className="Page-section">
      <ChartDownload
        selected={this.props.downloadSelected}
        changeAction={this.props.changeAction}
        name="programmes-chart"
        open={this.props.open}
        canvasAction={this.props.canvasAction}
        clickAction={this.props.clickAction}
        items={this.props.downloadItems}
        closeModal={this.props.closeModal}
        modal={this.props.modal}
      />
    </div>
  );

  return (
    <div className="Page-sectionWrap Page-sectionWrap--card Page-sectionWrap--dark">
      <div className="Page-section u-paddingBottom u-paddingBottom--0">
        <h2 className="Page-subHeading">Programme budgets for {year}</h2>
        <p>A department&#x27;s programmes are the activities that it spends money on during the financial year. Different programmes have different expenditure budgets, depending on their requirements and available finances. More detail on the programmes is available in the department&#x27;s Estimates of National Expenditure (ENE) documents.
        </p>
      </div>
      <div className="Page-section Page-section--card u-paddingTop u-paddingTop--40">
        {hasNull ? noValues : withValues}
      </div>
      {hasNull ? null : downloadPrompt}
      <div className="Page-section">
        {
          Object.keys(files).map((key) => {
            return <Download title={key} link={files[key]} icon />;
          })
        }
      </div>
    </div>
  );
}
