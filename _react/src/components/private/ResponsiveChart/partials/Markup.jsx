import React from 'react';
import ReactBarChart from './../../ReactBarChart';
import ReactLineChart from './../../ReactLineChart';


export default function Markup(props) {
  const {
    width,
    type,
    items,
    guides,
    hover,
  } = props;

  const { getNode } = props;

  if (type === 'bar') {
    return (
      <ReactBarChart
        scale={1}
        {...{ getNode, items, width, guides, hover }}
      />
    );
  }

  if (type === 'line') {
    return (
      <ReactLineChart
        {...{ getNode, width, items, guides, hover }}
      />
    );
  }
}
