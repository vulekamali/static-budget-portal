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
      downloadAction: this.downloadAction.bind(this),
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


  downloadAction() {
    const { source } = this.state;
    const { location, department, year, items} = this.props;
    const shown = source === 'adjusted' ? 'adjusted for inflation' : 'not adjusted for inflation';

    canvg(this.canvas, renderToString(
      <ReactBarChart
        scale={1.5}
        download={{
          heading: department,
          subReactHeading: `${location} Department Budget for ${year}`,
          type: `Expenditure changes over time chart (${shown})`,
        }}
        items={items[source]}
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
    const { downloadAction, canvasAction, resizeAction, changeSource } = this.events;

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

          downloadAction,
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
