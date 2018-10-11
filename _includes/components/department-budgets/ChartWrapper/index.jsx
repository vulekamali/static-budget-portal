import { h, Component } from 'preact';
import { pick } from 'lodash';
import Chart from 'chart.js';

import flattenNesting from './flattenNesting.js';
import createChartJsConfig from './createChartJsConfig.js';


export default class ChartWrapper extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      node: null,
    };

    this.events = {
      renderChart: this.renderChart.bind(this),
    };
  }

  renderChart(node) {
    const { node: existingNode } = this.state;
    const { items } = this.props;

    if (!existingNode) {
      return this.setState({ node });
    }

    const chartJsData = flattenNesting(items);
    const config = createChartJsConfig(chartJsData);
    const chartInstance = new Chart(existingNode, config);

    return chartInstance;
  }

  render() {
    const state = pick(this.state, ['node']);
    const props = pick(this.props, ['items']);
    const events = pick(this.events, ['renderChart']);
    const passedProps = { ...state, ...props, ...events };
    return <Markup {...passedProps} />;
  }
}


function Markup({ renderChart, items }) {
  const { labels } = flattenNesting(items);

  return (
    <div>
      <canvas ref={ref => renderChart(ref)} height={(labels.length * 25) + 55} />
    </div>
  );
}
