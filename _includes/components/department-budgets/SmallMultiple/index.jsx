import { h } from 'preact';

import ChartWrapper from './../ChartWrapper/index.jsx';
import normaliseData from './normaliseData.js';


export default function SmallMultiple({ items: rawItems }) {
  const items = normaliseData(rawItems);
  return <ChartWrapper {...{ items }} />;
}
