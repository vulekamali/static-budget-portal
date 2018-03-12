import { h, Component } from 'preact';
import DebounceFunction from './../../../utilities/js/helpers/DebounceFunction.js';
import BarChart from './../BarChart/index.jsx';
import ColumnChart from './../ColumnChart/index.jsx';


export default class ResponsiveChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: window.innerWidth,
      mobile: true,
    };

    const func = () => {
      if (this.state.mobile && window.innerWidth >= 600) {
        this.setState({ mobile: false });
      } else if (!this.state.mobile && window.innerWidth < 600) {
        this.setState({ mobile: true });
      }

      if (window.innerWidth < parseInt(this.props.max, 10)) {
        return this.setState({ viewport: window.innerWidth });
      }

      return this.setState({ viewport: parseInt(this.props.max, 10) });
    };

    func();
    const viewportDebounce = new DebounceFunction(100);
    const updateViewport = () => viewportDebounce.update(func);

    window.addEventListener(
      'resize',
      updateViewport,
    );
  }

  render() {
    const width = this.state.viewport - parseInt(this.props.offset, 10);

    const determineChartType = () => {
      if (this.props.columns && width >= parseInt(this.props.columns, 10)) {
        return (
          <ColumnChart
            items={this.props.values}
            hover={!this.state.mobile}
            guides={!this.state.mobile}
            {...{ width }}
          />
        );
      }

      return (
        <BarChart
          items={this.props.values}
          hover={!this.state.mobile}
          guides={!this.state.mobile}
          {...{ width }}
        />
      );
    };

    return (
      <div className="ResponsiveChart">
        {determineChartType()}
      </div>
    );
  }
}
