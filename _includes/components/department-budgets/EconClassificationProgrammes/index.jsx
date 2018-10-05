import { h } from 'preact';

import ChartWrapper from './../ChartWrapper/index.jsx';
import normaliseData from './normaliseData.js';


export default function EconClassificationProgrammes({ items: rawItems }) {
  const items = normaliseData(rawItems);
  console.log(items);
  return <ChartWrapper {...{ items }} />;
}
