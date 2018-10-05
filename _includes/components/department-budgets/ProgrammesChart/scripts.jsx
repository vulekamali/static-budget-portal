import renderToString from 'preact-render-to-string';
import canvg from 'canvg-browser';
import { Component } from 'preact';
import BarChart from './../../universal/BarChart/index.jsx';
import Markup from './index.jsx';
import { preactConnect } from '../../../utilities/js/helpers/connector.js';


class ProgrammesChart extends Component {
  constructor(props) {
    super(props);
    const { values, files } = this.props;

    this.values.items = values.reduce(
      (results, val) => {
        return {
          ...results,
          [val.name]: [val.total_budget],
        };
      },
      {},
    );

    this.values.files = Object.keys(files).reduce(
      (results, key) => {
        const object = files[key].formats.reduce(
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

    
    this.state = {
      selected: 'link',
    };

    this.hasNull = Object.keys(this.values.items).reduce(
      (result, key) => {
        return !this.values.items[key] ? true : result;
      },
      false,
    );

    this.events = {
      downloadAction: this.downloadAction.bind(this),
      canvasAction: this.canvasAction.bind(this),
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
    const { year, location } = this.props;
    const { files, items } = this.values;
    const { downloadAction, canvasAction } = this.events;

    return (
      <Markup
        national={location === 'National'}
        {...{
          hasNull,
          width,
          mobile,
          items,
          files,
          year,
          location,
          downloadAction,
          canvasAction,
        }}
      />
    );
  }
}


const query = {
  values: 'json',
  year: 'string',
  files: 'json',
  dept: 'string',
  location: 'string',
};


export default preactConnect(ProgrammesChart, 'ProgrammesChart', query);


//     render(
//       <ProgrammesChartContainer {...{ items, year, files, location, department }} />,
//       node,
//     );
//   }
// }


// export default scripts();
