import { h, Component } from 'preact';
import { saveSvgAsPng } from 'save-svg-as-png';
import canvg from 'canvg-browser';
import calcMaxValue from './calcMaxValue.js';
import BreakpointListener from './BreakpointListener.js';
import GraphMarkup from './GraphMarkup.jsx';


export default class GraphContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '1',
      open: false,
      fontSize: null,
      popupFontSize: null,
      barWidth: 12,
      lineGutter: 4,
      valueSpace: null,
      groupMargin: 40,
      maxValue: calcMaxValue(this.props.items),
      popupWidth: 90,
      popupHeight: 30,
      popUpOffset: 6,
      popupCentre: 5,
      labelBreakpoints: 4,
      padding: [0, 80, 60, 0],
      buffer: 20,
      charWrap: 10,
      charLineHeight: 20,
      titleSpace: 40,
    };

    const breakpointsConfig = {
      490: () => this.setState({
        valueSpace: 200,
        fontSize: 55,
        popupFontSize: 55,
        padding: [0, 100, 80, 10],
        lineGutter: 25,
        popupHeight: 25,
        popupCentre: 5,
        barWidth: 15,
        groupMargin: 50,
        charWrap: 30,
        charLineHeight: 20,
        titleSpace: 25,
        buffer: 5,
        labelBreakpoints: 2,
      }),
      550: () => this.setState({
        valueSpace: 300,
        fontSize: 55,
        popupFontSize: 55,
        padding: [0, 100, 80, 0],
        lineGutter: 25,
        popupHeight: 25,
        popupCentre: 5,
        barWidth: 15,
        groupMargin: 50,
        charWrap: 50,
        charLineHeight: 20,
        titleSpace: 25,
        buffer: 10,
        labelBreakpoints: 3,
      }),
      700: () => this.setState({
        buffer: 20,
        valueSpace: 400,
        fontSize: 24,
        popupFontSize: 24,
        padding: [0, 100, 80, 0],
        lineGutter: 15,
        popupHeight: 25,
        popupCentre: 5,
        barWidth: 15,
        groupMargin: 60,
        charWrap: 50,
        charLineHeight: 20,
        titleSpace: 0,
        labelBreakpoints: 4,
      }),
      1080: () => this.setState({
        valueSpace: 500,
        fontSize: 14,
        popupFontSize: 14,
        padding: [0, 100, 60, 0],
        lineGutter: 8,
        popupHeight: 30,
        popupCentre: 5,
        barWidth: 12,
        groupMargin: 40,
        charWrap: 65,
        charLineHeight: 14,
        titleSpace: 0,
        labelBreakpoints: 4,
      }),
    };

    this.breakpoints = new BreakpointListener(50, breakpointsConfig);
    this.breakpoints.update();
    const breakpointsWrap = () => this.breakpoints.updateDebounce();

    window.addEventListener(
      'resize',
      breakpointsWrap,
    );

    this.image = null;
    this.addImage = this.addImage.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
    this.setOpenState = this.setOpenState.bind(this);
    this.screenshotProps = {
      maxValue: calcMaxValue(this.props.items),
      popupWidth: 90,
      popUpOffset: 6,
      buffer: 20,
      valueSpace: 600,
      fontSize: 14,
      popupFontSize: 14,
      padding: [0, 100, 60, 0],
      lineGutter: 8,
      popupHeight: 30,
      popupCentre: 5,
      barWidth: 12,
      groupMargin: 40,
      charWrap: 65,
      charLineHeight: 14,
      titleSpace: 0,
      labelBreakpoints: 4,
    }
  }


  setOpenState(value) {
    if (this.state.open === true) {
      return this.setState({
        ...this.state,
        open: false,
        selected: value,
      });
    }

    return this.setState({ open: true });
  }

  downloadImage() {
    return saveSvgAsPng(this.image, 'graph.png', { scale: this.state.selected, backgroundColor: 'white', canvg });
  }

  addImage(node) {
    this.image = node;
  }


  render() {
    return (
      <div>
        <GraphMarkup
          items={this.props.items}
          legend={this.props.legend}
          styling={this.state}
          year={this.props.year}
          addImage={this.addImage}
          downloadImage={this.downloadImage}
          open={this.state.open}
          setOpenState={this.setOpenState}
          selected={this.state.selected}
          screenshotProps={this.screenshotProps}
        />
      </div>
    );
  }
}
