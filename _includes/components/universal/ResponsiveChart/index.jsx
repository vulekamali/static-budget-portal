import { h, Component } from 'preact';
import render from 'preact-render-to-string';
import canvg from 'canvg-browser';
import DebounceFunction from './../../../utilities/js/helpers/DebounceFunction.js'
import BarChart from './../BarChart/index.jsx';
import ColumnChart from './../ColumnChart/index.jsx';
import Modal from './../../universal/Modal/index.jsx';
import ChartDownload from './../ChartDownload/index.jsx';
import Radios from './../Radios/index.jsx';


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
    this.sources = Object.keys(this.props.charts);

    this.state = {
      viewport: window.innerWidth,
      mobile: true,
      modalOpen: false,
      selectOpen: false,
      selected: hardcoded[this.sizes[0]],
      selectedSource: this.sources[0],
    };

    const func = () => {
      if (this.state.mobile && window.innerWidth >= 600) {
        this.setState({ mobile: false });
      } else if (!this.state.mobile && window.innerWidth < 600) {
        this.setState({ mobile: true });
      }

      if (window.innerWidth < parseInt(this.props.max, 10)) {
        return this.setState({ viewport: window.innerWidth });
      }

      return this.setState({ viewport: parseInt(this.props.max, 10) });
    };

    func();
    const viewportDebounce = new DebounceFunction(100);
    const updateViewport = () => viewportDebounce.update(func);

    window.addEventListener(
      'resize',
      updateViewport,
    );

    this.canvas = null;
    this.getCanvas = this.getCanvas.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeAction = this.changeAction.bind(this);
    this.clickAction = this.clickAction.bind(this);
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


  render() {
    const modal = (
      <Modal title="Share this link:" closeAction={this.closeModal} open={this.state.modalOpen}>
        <a className="u-wordBreak u-wordBreak--breakAll" href={window.location.href}>
          {window.location.href}
        </a>
      </Modal>
    );

    const width = this.state.viewport - parseInt(this.props.offset, 10);

    const selectDownload = (
      <div>
        <ChartDownload
          open={this.state.selectOpen}
          name={`${this.props.name}-selected-download`}
          selected={this.state.selected}
          clickAction={this.clickAction}
          changeAction={this.changeAction}
          canvasAction={this.getCanvas}
          items={hardcoded}
        />
      </div>
    );

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

    console.log(this.sources, this.sources.length)

    return (
      <div className="ResponsiveChart">
        {this.props.downloadable ? modal : null}
        {determineChartType()}
        {this.sources.length > 1 ? selectSource : null}
        {this.props.downloadable ? selectDownload : null}
      </div>
    );
  }
}
