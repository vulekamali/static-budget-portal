import { createElement } from 'react';
import { render } from 'react-dom';
import Button from '../../components/Button';

const node = document.querySelector('[data-webapp="national-treemap"]');
const component = createElement(Button, {}, 'Hello World!');

const initialise = (): any => {
  return render(component, node);
};

export default initialise();
