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
    const { year, dataset, sourceType, guide, excel, pdf, cpi } = this.props;
    const { items } = this.values;
    const { downloadAction, canvasAction } = this.events;

    const linksListArrayRaw = [
      {
        id: 'dataset',
        prefix: 'Source',
        title: `${sourceType} ${year}`,
        link: dataset,
        type: 'dataset',
      },
      {
        id: 'guide',
        title: `Dataset Guide for ${sourceType}`,
        link: guide,
        type: 'guide',
      },
      {
        id: 'pdf',
        title: `Learn more about these programmes in the ${sourceType} as PDF`,
        link: pdf,
        type: 'download',
      },
      {
        id: 'excel',
        title: `Learn more about these programmes in the ${sourceType} as Excel`,
        link: excel,
        type: 'download',
      },
      {
        id: 'cpi',
        title: 'Annual CPI Inflation {year} as Excel document',
        link: cpi,
        type: 'download',
      },
    ];

    const linksListArray = linksListArrayRaw.filter(({ link }) => !!link);

    return (
      <Markup
        national={location === 'National'}
        {...{
          hasNull,
          items,
          linksListArray,
          year,
          downloadAction,
          canvasAction,
          sourceType,
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
