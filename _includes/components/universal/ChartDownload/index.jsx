import { h, Component } from 'preact';
import render from 'preact-render-to-string';
import canvg from 'canvg-browser';
import Markup from './partials/Markup.jsx';
import BarChart from './../BarChart/index.jsx';
import ColumnChart from './../ColumnChart/index.jsx';
import ChartDownload from './../ChartDownload/index.jsx';

const hardcoded = {
  'Image (PNG Small)': '1',
  'Image (PNG Medium)': '2',
  'Image (PNG Large)': '3',
  Link: 'link',
};


export default class ResponsiveChart extends Component {
  constructor(props) {
    super(props);

    this.sizes = Object.keys(hardcoded);

    this.state = {
      modal: false,
      selected: hardcoded[this.sizes[0]],
    };

    this.canvas = null;
    this.getCanvas = this.getCanvas.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeAction = this.changeAction.bind(this);
    this.clickAction = this.clickAction.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  getCanvas(node) {
    this.canvas = node;
  }


  closeModal() {
    return this.setState({ modalOpen: false });
  }


  changeAction(value) {
    if (this.state.selectOpen) {
      this.setState({ selectOpen: false });
      return this.setState({ selected: value });
    }

    return this.setState({ selectOpen: true });
  }


  clickAction() {
    if (this.state.selected === 'link') {
      return this.setState({ modalOpen: true });
    }

    const svg = this.props.columns ?
      render(
        <ColumnChart
          width={600}
          items={this.props.charts[this.state.selectedSource]}
          hover={false}
          guides
          scale={this.state.selected}
          downloadable
        />,
      ) :
      render(
        <BarChart
          width={600}
          items={this.props.charts[this.state.selectedSource]}
          hover={false}
          guides
          scale={this.state.selected}
          downloadable
        />,
      );

    canvg(this.canvas, svg);

    if (this.canvas.msToBlob) {
      const blob = this.canvas.msToBlob();
      return window.navigator.msSaveBlob(blob, 'chart.png', { scaleWidth: 10, scaleHeight: 10 });
    }

    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = this.canvas.toDataURL();
    return link.click();
  }


  closeModal() {
    this.setState({ modal: false });
  }


  render() {
    const width = this.state.viewport - parseInt(this.props.offset, 10);
    const sources = this.sources.reduce(
      (result, key) => {
        return {
          ...result,
          [key]: key,
        };
      },
      {},
    );

    const selectSource = (
      <div className="u-textAlign u-textAlign--center">
        <Radios
          items={sources}
          selected={this.state.selectedSource}
          name={`${this.props.name}-selected-source`}
          changeAction={selectedSource => this.setState({ selectedSource })}
        />
      </div>
    );

    const determineChartType = () => {
      if (this.props.columns && width >= parseInt(this.props.columns, 10)) {
        return (
          <ColumnChart
            items={this.props.charts[this.state.selectedSource]}
            hover={!this.state.mobile}
            guides={!this.state.mobile}
            {...{ width }}
          />
        );
      }

      return (
        <BarChart
          items={this.props.charts[this.state.selectedSource]}
          hover={!this.state.mobile}
          guides={!this.state.mobile}
          {...{ width }}
        />
      );
    };

    return (
      <Markup
        open={this.state.selectOpen}
        name={`${this.props.name}-selected-download`}
        selected={this.state.selected}
        clickAction={this.clickAction}
        changeAction={this.changeAction}
        canvasAction={this.getCanvas}
        items={hardcoded}
        modal={this.state.modal}
        closeModal={this.closeModal}
      />
    );
  }
}
