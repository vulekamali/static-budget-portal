import { h, Component } from 'preact';
import Chart from 'chart.js';
import PropTypes from 'prop-types';

import createChartJsConfig from './services/createChartJsConfig/index.js';
import downloadChart from './services/downloadChart/index.js';


const buildDownloadButton = downloadAction => (
  <div className="ChartWrapper-button">
    <button
      className="Button is-small is-inline is-secondary"
      onClick={downloadAction}
    >
      Download chart
    </button>
  </div>
);


const Markup = ({ renderChart, height, downloadAction }) => {
  return (
    <div className="ChartWrapper">
      <div>
        <canvas ref={renderChart} style={{ width: '100%', height: `${height}px` }} />
      </div>
      {buildDownloadButton(downloadAction)}
    </div>
  );
};


Markup.propTypes = {
  renderChart: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  downloadAction: PropTypes.func.isRequired,
};


class BarChart extends Component {
  constructor(...props) {
    super(...props);
    const { items, color, rotated } = this.props;

    this.values = {
      config: createChartJsConfig({ items, color, rotated }),
    };

    this.events = {
      renderChart: this.renderChart.bind(this),
      downloadAction: this.downloadAction.bind(this),
      calcHeight: this.calcHeight.bind(this),
    };
  }

  downloadAction(event) {
    event.preventDefault();

    const { downloadText } = this.props;
    const { config } = this.values;
    const { calcHeight } = this.events;
    const height = calcHeight(2);

    const canvas = document.createElement('canvas');
    const container = document.createElement('div');
    container.appendChild(canvas);
    document.body.appendChild(container);

    container.style.position = 'fixed';
    container.style.top = '200%';
    container.style.width = '800px';
    canvas.height = height;
    canvas.style.height = `${height}px`;

    new Chart(canvas, config);
    downloadChart({ canvas, height, downloadText });
  }

  calcHeight(scale) {
    const { config } = this.values;
    return (config.data.datasets[0].data.length * (25 * scale)) + 55;
  }

  renderChart(node) {
    const { config } = this.values;
    const instance = new Chart(node, config);
    return instance;
  }


  render() {
    const { renderChart, downloadAction } = this.events;
    const { node } = this.state;
    const { scale } = this.props;
    const { calcHeight } = this.events;

    const height = calcHeight(scale);
    return <Markup button {...{ downloadAction, renderChart, height, node }} />;
  }
}


export default BarChart;

