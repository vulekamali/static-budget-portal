import { createElement } from 'react';
import { render } from 'react-dom';

import DataLoader from './DataLoader'

const node = document.querySelector('[data-webapp="national-treemap"]');
const component = createElement(DataLoader, {}, 'Hello World!');

const initialise = () => {
  return render(component, node);
};

export default initialise();
