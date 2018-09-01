import renderToString from 'preact-render-to-string';
import canvg from 'canvg-browser';
import { h, render, Component } from 'preact';
import BarChart from './../../universal/BarChart/index.jsx';
import ProgrammesChart from './index.jsx';
import calcShareAction from './partials/calcShareAction.js';
import getProp from './../../../utilities/js/helpers/getProp.js';


class ProgrammesChartContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'link',
    };

    this.hasNull = Object.keys(this.props.items).reduce(
      (result, key) => {
        return !this.props.items[key] ? true : result;
      },
      false,
    );

    this.events = {
      downloadAction: this.downloadAction.bind(this),
      canvasAction: this.canvasAction.bind(this),
    };
  }


  downloadAction() {
    canvg(this.canvas, renderToString(
      <BarChart
        scale={1.5}
        download={{
          heading: this.props.department,
          subHeading: `${this.props.location} Department Budget for ${this.props.year}`,
          type: 'Programme budgets chart',
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
    const { items, files, year, deptLocation } = this.props;
    const { downloadAction, canvasAction } = this.events;

    return (
      <ProgrammesChart
        national={deptLocation === 'National'}
        {...{
          hasNull,
          width,
          mobile,
          items,
          files,
          year,
          deptLocation,
          downloadAction,
          canvasAction,
        }}
      />
    );
  }
}


function scripts() {
  const nodes = document.getElementsByClassName('js-initProgrammesChart');

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    const rawValues = getProp('values', node, 'json').data;
    const rawFiles = getProp('files', node, 'json');
    const year = getProp('year', node);
    const department = getProp('dept', node);
    const location = getProp('dept-location', node);


    const items = rawValues.reduce(
      (results, val) => {
        return {
          ...results,
          [val.name]: [val.total_budget],
        };
      },
      {},
    );

    const files = Object.keys(rawFiles).reduce(
      (results, key) => {
        const object = rawFiles[key].formats.reduce(
          (innerResults, val) => {
            return {
              ...innerResults,
              [`${key} (${val.format.replace(/^xls.+/i, 'Excel')})`]: val.url,
            };
          },
          {},
        );

        return {
          ...results,
          ...object,
        };
      },
      {},
    );

    render(
      <ProgrammesChartContainer {...{ items, year, files, location, department }} />,
      node,
    );
  }
}


export default scripts();
