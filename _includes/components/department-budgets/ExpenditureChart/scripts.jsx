import { h, render, Component } from 'preact';
import renderToString from 'preact-render-to-string';
import canvg from 'canvg-browser';
import ExpenditureChart from './index.jsx';
import decodeHtmlEntities from './../../../utilities/js/helpers/decodeHtmlEntities.js';
import ColumnChart from './../../universal/BarChart/index.jsx';


class ExpenditureChartContainer extends Component {
  constructor(props) {
    super(props);

    this.sources = Object.keys(this.props.items);
    this.state = {
      selected: '1',
      open: false,
      modal: false,
      sourceSelected: this.sources[0],
    };

    this.canvas = null;
    this.getCanvas = this.getCanvas.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeAction = this.changeAction.bind(this);
    this.clickAction = this.clickAction.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeSourceAction = this.changeSourceAction.bind(this);

  }

  getCanvas(node) {
    this.canvas = node;
  }

  changeSourceAction(sourceSelected) {
    this.setState({ sourceSelected });
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
      <ColumnChart
        scale={parseInt(this.state.selected, 10)}
        downloadable
        items={this.props.items[this.state.sourceSelected]}
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
      <ExpenditureChart
        downloadSelected={this.state.selected}
        changeAction={this.changeAction}
        name="programmes-chart"
        open={this.state.open}
        canvasAction={(node) => { this.canvas = node; }}
        clickAction={this.clickAction}
        downloadItems={{
          'Image (PNG Small)': '1',
          'Image (PNG Medium)': '2',
          'Image (PNG Large)': '3',
          Link: 'link',
        }}
        closeModal={this.closeModal}
        modal={this.state.modal}
        sourceItems={this.props.items[this.state.sourceSelected]}
        hasNull={this.hasNull}
        year={this.props.year}
        sources={this.sources}
        sourceSelected={this.state.sourceSelected}
        changeSourceAction={this.changeSourceAction}
      />
    );
  }
}



function scripts() {
  const componentList = document.getElementsByClassName('js-initExpenditureChart');

  for (let i = 0; i < componentList.length; i++) {
    const component = componentList[i];

    const real = JSON.parse(decodeHtmlEntities(component.getAttribute('data-real'))).data;
    const nominal = JSON.parse(decodeHtmlEntities(component.getAttribute('data-nominal'))).data;

    const normalise = (source) => {
      return source.reduce(
        (results, val) => {
          if (val.amount) {
            return {
              ...results,
              [val.financial_year]: [val.amount],
            };
          }

          return results;
        },
        {},
      );
    };

    const items = {
      'Adjusted for inflation': normalise(real),
      'Not adjusted for inflation': normalise(nominal),
    };

    render(
      <ExpenditureChartContainer {...{ items }} />,
      component,
    );
  }
}


export default scripts();
