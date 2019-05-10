import { colors } from './data.json';
import { flatten } from 'lodash';

const coloursList = flatten(new Array(30).fill(null).map(() => colors));

export default coloursList;
