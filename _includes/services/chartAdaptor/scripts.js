import { h } from 'preact';

import { preactConnect as connect } from '../../utilities/js/helpers/connector.js';
import normaliseProgrammes from './services/normaliseProgrammes/index.js';
import normaliseSmallMultiples from './services/normaliseSmallMultiples/index.js';
import normaliseExpenditure from './services/normaliseExpenditure/index.js';
import ChartSourceController from '../../components/ChartSourceController/index.jsx';
import { toggleValues } from './data.json';


const normaliseData = ({ type, rawItems }) => {
  switch (type) {
    case 'multiple': return normaliseSmallMultiples(rawItems);
    case 'programmes': return normaliseProgrammes(rawItems);
    case 'expenditure': return normaliseExpenditure(rawItems);
    default: return null;
  }
};


const ChartAdaptor = (props) => {
  const { scale, type, items: rawItems } = props;

  const items = normaliseData({ type, rawItems });
  const color = type === 'expenditure' ? '#ad3c64' : '#73b23e';
  const rotated = !!(type === 'expenditure');
  const toggle = type === 'expenditure' ? toggleValues : null;

  const styling = { scale, color, rotated };
  return h(ChartSourceController, { items, toggle, styling });
};


const query = {
  type: 'string',
  items: 'json',
  scale: 'number',
  color: 'string',
};


export default connect(ChartAdaptor, 'ChartAdaptor', query);

