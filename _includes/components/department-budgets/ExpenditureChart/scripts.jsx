import renderToString from 'preact-render-to-string';
import { h, Component } from 'preact';
import canvg from 'canvg-browser';
import { pick } from 'lodash';

import Markup from './index.jsx';
import BarChart from './../../universal/BarChart/index.jsx';
import { preactConnect } from '../../../utilities/js/helpers/connector.js';


const removeNulls = val => val.amount !== null;
const normalisePhaseTable = val => [val.financial_year, val.phase];


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


class ExpenditureChart extends Component {
  constructor(props) {
    super(props);
    const { adjusted: rawAdjusted, notAdjusted: rawNotAdjusted, files: rawFiles } = this.props;

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

    const items = {
      adjusted: rawAdjusted.filter(removeNulls).reduce(normaliseObject, {}),
      notAdjusted: rawNotAdjusted.filter(removeNulls).reduce(normaliseObject, {}),
    };

    this.values = {
      phaseTable: rawAdjusted.filter(removeNulls).map(normalisePhaseTable),
      files: Object.keys(rawFiles).reduce(normaliseFiles(rawFiles), {}),
      canvas: null,
      items,
    };
  }


  resizeAction(val) {
    const { type } = this.state;

    if (val > 600 && type !== 'line') {
      return this.setState({ type: 'line' });
    }

    if (val <= 600 && type !== 'bar') {
      return this.setState({ type: 'bar' });
    }

    return null;
  }


  downloadAction() {
    const { items, canvas } = this.values;
    const { department, location, year } = this.props;
    const { source } = this.state;

    const shown = source === 'adjusted' ? 'adjusted for inflation' : 'not adjusted for inflation';

    canvg(canvas, renderToString(
      <BarChart
        scale={1.5}
        download={{
          heading: department,
          subHeading: `${location} Department Budget for ${year}`,
          type: `Expenditure changes over time chart (${shown})`,
        }}
        items={items[source]}
        guides
        width={900}
      />,
    ));

    if (canvas.msToBlob) {
      const blob = canvas.msToBlob();
      return window.navigator.msSaveBlob(blob, 'chart.png', { scaleWidth: 10, scaleHeight: 10 });
    }

    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = canvas.toDataURL();
    link.setAttribute('type', 'hidden');
    document.body.appendChild(link);
    return link.click();
  }

  canvasAction(node) {
    this.values.canvas = node;
  }


  changeSource(value) {
    return this.setState({ source: value });
  }


  render() {
    const { source } = this.state;
    const { items: rawItems } = this.values;
    const items = rawItems[source];

    const props = pick(this.props, ['year', 'location', 'cpi', 'dataset']);
    const values = pick(this.values, ['items', 'files', 'phaseTable']);
    const state = pick(this.state, ['width', 'mobile', 'source', 'type']);
    const eventSelected = ['downloadAction', 'canvasAction', 'resizeAction', 'changeSource'];
    const events = pick(this.events, eventSelected);

    const passedProps = { ...props, ...values, ...state, ...events, items };
    return <Markup {...passedProps} />;
  }
}


const query = {
  adjusted: 'json',
  notAdjusted: 'json',
  year: 'string',
  location: 'string',
  files: 'json',
  department: 'string',
  cpi: 'string',
  dataset: 'string',
};


export default preactConnect(ExpenditureChart, 'ExpenditureChart', query);
