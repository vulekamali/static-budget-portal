import { h } from 'preact';

import { preactConnect as connect } from '../../utilities/js/helpers/connector.js';
import normaliseProgrammes from './services/normaliseProgrammes/index.js';
import normaliseSmallMultiples from './services/normaliseSmallMultiples/index.js';
import normaliseExpenditure from './services/normaliseExpenditure/index.js';
import normaliseAdjusted from './services/normaliseAdjusted/index.js';
import ChartSourceController from '../../components/ChartSourceController/index.jsx';
import { toggleValues } from './data.json';


const normaliseData = ({ type, rawItems, rotated }) => {
  switch (type) {
    case 'multiple': return normaliseSmallMultiples(rawItems);
    case 'programmes': return normaliseProgrammes(rawItems);
    case 'expenditure': return normaliseExpenditure(rawItems);
    case 'adjusted': return normaliseAdjusted(rawItems, rotated);
    default: return null;
  }
};


const ChartAdaptor = (props) => {
  const { scale, type, items: rawItems, title, subtitle, description, rotated } = props;

  const items = normaliseData({ type, rawItems, rotated });
  const color = type === 'expenditure' ? '#ad3c64' : '#73b23e';
  const toggle = type === 'expenditure' ? toggleValues : null;

  const downloadText = {
    title,
    subtitle,
    description,
  };

  const styling = { scale, color, rotated };
  return h(ChartSourceController, { items, toggle, styling, downloadText });
};


const query = {
  type: 'string',
  items: 'json',
  scale: 'number',
  color: 'string',
  title: 'string',
  subtitle: 'string',
  description: 'string',
  rotated: 'boolean',
};


export default connect(ChartAdaptor, 'ChartAdaptor', query);

