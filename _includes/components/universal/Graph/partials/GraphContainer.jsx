import { h, Component } from 'preact';
import calcMaxValue from './calcMaxValue.js';
import BreakpointListener from './BreakpointListener.js';
import GraphMarkup from './GraphMarkup.jsx';


export default class GraphContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: null,
      popupFontSize: null,
      barWidth: 12,
      lineGutter: 4,
      valueSpace: null,
      groupMargin: 40,
      titleHeight: 20,
      units: 'bn',
      maxValue: calcMaxValue(this.props.items),
      popupWidth: 60,
      popupHeight: 30,
      popUpOffset: 6,
      popupCentre: 5,
      labelBreakpoints: null,
      padding: [0, 80, 60, 0],
      buffer: 20,
    };

    const breakpointsConfig = {
      430: () => this.setState({
        valueSpace: 320,
        fontSize: 55,
        popupFontSize: 55,
        padding: [0, 80, 130, 0],
        lineGutter: 15,
        popupHeight: 25,
        popupCentre: 5,
        titleHeight: 70,
        barWidth: 15,
        groupMargin: 10,
      }),
      600: () => this.setState({
        valueSpace: 410,
        fontSize: 24,
        popupFontSize: 24,
        padding: [0, 80, 80, 0],
        lineGutter: 15,
        popupHeight: 25,
        popupCentre: 5,
        titleHeight: 40,
        barWidth: 15,
        groupMargin: 30,
      }),
      1080: () => this.setState({
        valueSpace: 510,
        fontSize: 14,
        popupFontSize: 14,
        padding: [0, 80, 60, 0],
        lineGutter: 8,
        popupHeight: 30,
        popupCentre: 5,
        titleHeight: 25,
        barWidth: 12,
        groupMargin: 40,
      }),
    };

    this.breakpoints = new BreakpointListener(50, breakpointsConfig);
    this.breakpoints.update();
    const breakpointsWrap = () => this.breakpoints.updateDebounce();

    window.addEventListener(
      'resize',
      breakpointsWrap,
    );
  }

  render() {
    return (
      <GraphMarkup
        items={this.props.items}
        legend={this.props.legend}
        styling={this.state}
      />
    );
  }
}
