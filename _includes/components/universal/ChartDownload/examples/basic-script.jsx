import renderToString from 'preact-render-to-string';
import canvg from 'canvg-browser';
import { h, Component, render } from 'preact';
import ChartDownload from './../index.jsx';
import BarChart from './../../BarChart/index.jsx';


function basicScript() {
  class ChartDownloadBasicTest extends Component {
    constructor(props) {
      super(props);

      this.state = {
        selected: '1',
        open: false,
        modal: false,
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

    changeAction(value) {
      if (this.state.open) {
        this.setState({ selected: value });
        return this.setState({ open: false });
      }

      return this.setState({ open: true });
    }

    clickAction() {
      if (this.state.selected === 'link') {
        return this.setState({ modal: true });
      }

      canvg(this.canvas, renderToString(
        <BarChart
          scale={parseInt(this.state.selected, 10)}
          downloadable
          items={{ 'Test 1': [10], 'Test 2': [20], 'Test 3': [30] }}
          guides
          width={600}
        />,
      ));

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
      return this.setState({ modal: false });
    }

    render() {
      return (
        <ChartDownload
          selected={this.state.selected}
          changeAction={this.changeAction}
          name="example"
          open={this.state.open}
          canvasAction={(node) => { this.canvas = node; }}
          clickAction={this.clickAction}
          items={{
            'Image (PNG Small)': '1',
            'Image (PNG Medium)': '2',
            'Image (PNG Large)': '3',
            Link: 'link',
          }}
          closeModal={this.closeModal}
          modal={this.state.modal}
        />
      );
    }
  }


  const node = document.getElementById('basic-chartdownload-07-03');
  render(
    <ChartDownloadBasicTest />,
    node,
  );
}


export default basicScript();
