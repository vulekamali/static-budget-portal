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
      source: 'adjusted',
      type: 'bar',
    };

    this.events = {
      downloadAction: this.downloadAction.bind(this),
      canvasAction: this.canvasAction.bind(this),
      resizeAction: this.resizeAction.bind(this),
      changeSource: this.changeSource.bind(this),
    };
  }


  resizeAction(val) {
    if (val > 600 && this.state.type !== 'line') {
      return this.setState({ type: 'line' });
    }

    if (val <= 600 && this.state.type !== 'bar') {
      return this.setState({ type: 'bar' });
    }

    return null;
  }


  downloadAction() {
    const shown = this.state.source === 'adjusted' ? 'adjusted for inflation' : 'not adjusted for inflation';

    canvg(this.canvas, renderToString(
      <BarChart
        scale={1.5}
        download={{
          heading: this.props.department,
          subHeading: `${this.props.location} Department Budget for ${this.props.year}`,
          type: `Expenditure changes over time chart (${shown})`,
        }}
        items={this.props.items[this.state.source]}
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
    link.setAttribute('type', 'hidden');
    document.body.appendChild(link);
    return link.click();
  }

  canvasAction(node) {
    this.canvas = node;
  }


  changeSource(value) {
    return this.setState({ source: value });
  }


  render() {
    const { items, year, files, location, phaseTable, cpi } = this.props;
    const { width, mobile, source, type } = this.state;
    const { downloadAction, canvasAction, resizeAction, changeSource } = this.events;

    return (
      <ExpenditureChart
        items={items[this.state.source]}
        {...{
          year,
          files,
          location,
          phaseTable,

          width,
          mobile,
          source,
          type,
          cpi,

          downloadAction,
          canvasAction,
          resizeAction,
          changeSource,
        }}
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
    const department = getProp('department', node);
    const location = getProp('location', node);
    const rawFiles = getProp('files', node, 'json');
    const cpi = getProp('cpi', node);

    const removeNulls = val => val.amount !== null;
    const normalisePhaseTable = val => [val.financial_year, val.phase];

    const adjusted = rawAdjusted.filter(removeNulls).reduce(normaliseObject, {});
    const notAdjusted = rawNotAdjusted.filter(removeNulls).reduce(normaliseObject, {});
    const phaseTable = rawAdjusted.filter(removeNulls).map(normalisePhaseTable);
    const files = Object.keys(rawFiles).reduce(normaliseFiles(rawFiles), {});
    const items = { adjusted, notAdjusted };

    render(
      <ExpenditureChartContainer
        {...{ items, year, department, location, phaseTable, files, cpi }}
      />,
      node,
    );
  }
}


export default scripts();
