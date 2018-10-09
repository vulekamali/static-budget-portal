import SmallMultiple from './index.jsx';
import { preactConnect } from '../../../utilities/js/helpers/connector.js';


const query = {
  items: 'json',
};


export default preactConnect(SmallMultiple, 'SmallMultiple', query);
