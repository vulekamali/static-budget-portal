import { renderToString } from 'react-dom/server';
import canvg from 'canvg-browser';
import downloadjs from 'downloadjs';
import React, { Component } from 'react';
import ReactBarChart from './../../private/ReactBarChart';
import Markup from './partials/Markup.jsx';
import './styles.css';


export default class ProgrammesChart extends Component {
  constructor(props) {
    super(props);

    this.events = {
      downloadAction: this.downloadAction.bind(this),
      canvasAction: this.canvasAction.bind(this),
    };
  }


  downloadAction() {
    const { department, location, year, items } = this.props;
    canvg(this.canvas, renderToString(
      <ReactBarChart
        scale={1.5}
        download={{
          heading: department,
          subReactHeading: `${location} Department Budget for ${year}`,
          type: 'Programme budgets chart',
        }}
        items={items}
        guides
        width={900}
      />,
    ));

    downloadjs(this.canvas.toDataURL(), `${department}.png`, 'image/png');
  }


  canvasAction(node) {
    this.canvas = node;
  }


  render() {
    const { hasNull } = this;
    const { items, files, year, deptLocation } = this.props;
    const { downloadAction, canvasAction } = this.events;

    return (
      <Markup
        national={deptLocation === 'National'}
        {...{
          hasNull,
          items,
          files,
          year,
          downloadAction,
          canvasAction,
        }}
      />
    );
  }
}
