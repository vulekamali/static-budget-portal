import renderToString from 'preact-render-to-string';
import { h, render, Component } from 'preact';
import canvg from 'canvg-browser';
import ExpenditureChart from './index.jsx';
import BarChart from './../../universal/BarChart/index.jsx';
import calcShareAction from './partials/calcShareAction.js';
import getProp from './../../../utilities/js/helpers/getProp.js';


class ExpenditureChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'link',
      open: false,
      modal: false,
      source: 'notAdjusted',
      type: 'bar',
    };

    this.changeAction = this.changeAction.bind(this);
    this.shareAction = this.shareAction.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.downloadAction = this.downloadAction.bind(this);
    this.canvasAction = this.canvasAction.bind(this);
    this.widthAction = this.widthAction.bind(this);
  }


  shareAction() {
    calcShareAction(
      this.state.selected,
      'programmes-chart',
      () => this.setState({ modal: true }),
    );
  }

  closeModal() {
    this.setState({ modal: false });
  }


  widthAction(val) {
    if (val > 600 && this.state.type !== 'line') {
      return this.setState({ type: 'line' });
    }

    if (val <= 600 && this.state.type !== 'bar') {
      return this.setState({ type: 'bar' });
    }

    return null;
  }


  downloadAction() {
    canvg(this.canvas, renderToString(
      <BarChart
        scale={1.5}
        downloadable={{
          heading: this.props.department,
          subHeading: `${this.props.location} Department Budget for ${this.props.year}`,
          type: 'Programme budgets',
        }}
        items={this.props.items}
        guides
        width={900}
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


  canvasAction(node) {
    this.canvas = node;
  }


  changeAction(value) {
    if (this.state.open) {
      return this.setState({
        ...this.state,
        selected: value,
        open: false,
      });
    }

    return this.setState({ open: true });
  }


  render() {
    return (
      <ExpenditureChart
        items={this.props.items[this.state.source]}
        width={this.state.width}
        parentAction={this.parentAction}
        mobile={this.state.mobile}
        year={this.props.year}
        files={this.props.files}

        open={this.state.open}
        selected={this.state.selected}
        changeAction={this.changeAction}
        shareAction={this.shareAction}
        closeModal={this.closeModal}
        modal={this.state.modal}

        downloadAction={this.downloadAction}
        canvasAction={this.canvasAction}
        phaseTable={this.props.phaseTable}
        widthAction={this.widthAction}
        type={this.state.type}
      />
    );
  }
}


function scripts() {
  const nodes = document.getElementsByClassName('js-initExpenditureChart');

  const normaliseObject = (result, val) => {
    if (val.amount !== null) {
      return {
        ...result,
        [val.financial_year]: [val.amount],
      };
    }

    return null;
  };

  const normaliseFormats = (key) => {
    return (innerResults, val) => {
      return {
        ...innerResults,
        [`${key} (${val.format.replace(/^xls.+/i, 'Excel')})`]: val.url,
      };
    };
  };

  const normaliseFiles = (rawFiles) => {
    return (result, key) => {
      const object = rawFiles[key].formats.reduce(normaliseFormats(key), {});

      return {
        ...result,
        ...object,
      };
    };
  };

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    const rawAdjusted = getProp('adjusted', node, 'json').data;
    const rawNotAdjusted = getProp('not-adjusted', node, 'json').data;
    const year = getProp('year', node);
    const deptartment = getProp('department', node);
    const location = getProp('location', node);
    const rawFiles = getProp('files', node, 'json');

    const removeNulls = val => val.amount !== null;
    const normalisePhaseTable = val => [val.financial_year, val.phase];

    const adjusted = rawAdjusted.filter(removeNulls).reduce(normaliseObject, {});
    const notAdjusted = rawNotAdjusted.filter(removeNulls).reduce(normaliseObject, {});
    const phaseTable = rawAdjusted.filter(removeNulls).map(normalisePhaseTable);
    const files = Object.keys(rawFiles).reduce(normaliseFiles(rawFiles), {});
    const items = { adjusted, notAdjusted };

    render(
      <ExpenditureChartContainer
        {...{ items, year, deptartment, location, phaseTable, files }}
      />,
      node,
    );
  }
}


export default scripts();
