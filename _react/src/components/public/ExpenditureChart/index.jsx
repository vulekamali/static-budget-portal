import { renderToString } from 'react-dom/server';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import downloadjs from 'downloadjs';
import canvg from 'canvg-browser';
import Markup from './partials/Markup.jsx';
import ReactBarChart from './../../private/ReactBarChart';
import './styles.css'


class ExpenditureChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'link',
      open: false,
      modal: false,
      source: 'adjusted',
      type: 'bar',
    };

    this.events = {
      ReactDownloadAction: this.ReactDownloadAction.bind(this),
      canvasAction: this.canvasAction.bind(this),
      resizeAction: this.resizeAction.bind(this),
      changeSource: this.changeSource.bind(this),
    };
  }


  resizeAction(val) {
    if (val > 600 && this.state.type !== 'line') {
      return this.setState({ type: 'line' });
    }

    if (val <= 600 && this.state.type !== 'bar') {
      return this.setState({ type: 'bar' });
    }

    return null;
  }


  ReactDownloadAction() {
    const shown = this.state.source === 'adjusted' ? 'adjusted for inflation' : 'not adjusted for inflation';

    canvg(this.canvas, renderToString(
      <ReactBarChart
        scale={1.5}
        ReactDownload={{
          heading: this.props.department,
          subReactHeading: `${this.props.location} Department Budget for ${this.props.year}`,
          type: `Expenditure changes over time chart (${shown})`,
        }}
        items={this.props.items[this.state.source]}
        guides
        width={900}
      />,
    ));

    downloadjs(this.canvas.toDataURL(), `${this.props.department}.png`, 'image/png')
  }

  canvasAction(node) {
    this.canvas = node;
  }


  changeSource(value) {
    return this.setState({ source: value });
  }


  render() {
    const { items, year, files, location, phaseTable, cpi } = this.props;
    const { width, mobile, source, type } = this.state;
    const { ReactDownloadAction, canvasAction, resizeAction, changeSource } = this.events;

    return (
      <Markup
        items={items[this.state.source]}
        {...{
          year,
          files,
          location,
          phaseTable,

          width,
          mobile,
          source,
          type,
          cpi,

          ReactDownloadAction,
          canvasAction,
          resizeAction,
          changeSource,
        }}
      />
    );
  }
}


const getProps = (state, ownProps) => {
  return ownProps;
};

const getAction = (dispatch, ownProps) => {
  return ownProps;
};

export default connect(getProps, getAction)(ExpenditureChart);
