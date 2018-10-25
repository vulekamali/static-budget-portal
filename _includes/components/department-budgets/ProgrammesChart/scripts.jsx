import renderToString from 'preact-render-to-string';
import canvg from 'canvg-browser';
import { h, Component } from 'preact';
import BarChart from './../../universal/BarChart/index.jsx';
import Markup from './index.jsx';
import { preactConnect } from '../../../utilities/js/helpers/connector.js';


class ProgrammesChart extends Component {
  constructor(props) {
    super(props);
    const { values } = this.props;

    const items = values.reduce(
      (results, val) => {
        return {
          ...results,
          [val.name]: [val.total_budget],
        };
      },
      {},
    );

    this.state = {
      selected: 'link',
    };

    this.hasNull = Object.keys(items).reduce(
      (result, key) => {
        return !items[key] ? true : result;
      },
      false,
    );

    this.events = {
      downloadAction: this.downloadAction.bind(this),
      canvasAction: this.canvasAction.bind(this),
    };

    this.values = {
      items,
    };
  }


  downloadAction() {
    const { department, location, year } = this.props;
    const { items } = this.values;

    canvg(this.canvas, renderToString(
      <BarChart
        scale={1.5}
        download={{
          heading: department,
          subHeading: `${location} Department Budget for ${year}`,
          type: 'Programme budgets chart',
        }}
        items={items}
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


  render() {
    const { hasNull } = this;
    const { width, mobile } = this.state;
    const { year, dataset, sourceType, guide, excel, pdf } = this.props;
    const { items } = this.values;
    const { downloadAction, canvasAction } = this.events;

    return (
      <Markup
        national={location === 'National'}
        {...{
          hasNull,
          width,
          mobile,
          items,
          year,
          location,
          downloadAction,
          canvasAction,
          sourceType,
          dataset,
          pdf,
          excel,
          guide,
        }}
      />
    );
  }
}


const query = {
  values: 'json',
  year: 'string',
  excel: 'string',
  pdf: 'string',
  dept: 'string',
  sourceType: 'string',
  dataset: 'string',
  guide: 'string',
};


export default preactConnect(ProgrammesChart, 'ProgrammesChart', query);
