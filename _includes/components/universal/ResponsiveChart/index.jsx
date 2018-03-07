import { h, Component } from 'preact';
import render from 'preact-render-to-string';
import canvg from 'canvg-browser';
import DebounceFunction from './../../../utilities/js/helpers/DebounceFunction.js'
import Chart from './../BarChart/index.jsx';
import Modal from './../../universal/Modal/index.jsx';
import ChartDownload from './../ChartDownload/index.jsx';


export default class ResponsiveChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: window.innerWidth,
      mobile: true,
      modalOpen: false,
      selectOpen: false,
      selected: '1',
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

    const svg = render(
      <Chart
        width={600}
        items={this.props.items}
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

    const hardcoded = {
      'Image (PNG Small)': '1',
      'Image (PNG Medium)': '2',
      'Image (PNG Large)': '3',
      Link: 'link',
    };

    const selectDownload = (
      <div>
        <ChartDownload
          open={this.state.selectOpen}
          name="selectDownload"
          selected={this.state.selected}
          clickAction={this.clickAction}
          changeAction={this.changeAction}
          canvasAction={this.getCanvas}
          items={hardcoded}
        />
      </div>
    );

    return (
      <div className="ResponsiveChart">
        {this.props.downloadable ? modal : null}
        <Chart
          width={this.state.viewport - parseInt(this.props.offset, 10)}
          items={this.props.items}
          hover={!this.state.mobile}
          guides={!this.state.mobile}
        />
        {this.props.downloadable ? selectDownload : null}
      </div>
    );
  }
}