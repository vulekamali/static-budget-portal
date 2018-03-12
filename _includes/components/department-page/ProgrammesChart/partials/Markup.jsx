import { h } from 'preact';
import ResponsiveChart from './../../../universal/ResponsiveChart/index.jsx';
import ChartDownload from './../../../universal/ChartDownload/index.jsx';


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
  } = props;

  const noValues = (
    <ul className="u-margin u-margin--0 u-paddingLeft u-paddingLeft--20">
      {Object.keys(sourceItems).map(val => <li>{val}</li>)}
    </ul>
  );

  const withValues = (
    <ResponsiveChart
      max={690}
      offset={120}
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
        name={this.props.name}
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
        <h2 className="Page-subHeading">Funded programmes for {year}</h2>
        <p>A department&#x27;s programmes are the activities that it performs during the financial year. Different programs have different levels of funding, depending on their requirements and available finances.</p>
      </div>
      <div className="Page-section Page-section--card u-paddingTop u-paddingTop--40">
        {hasNull ? noValues : withValues}
      </div>
      {hasNull ? null : downloadPrompt}
    </div>
  );
}
