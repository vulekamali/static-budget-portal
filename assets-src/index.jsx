import { h, render } from 'preact';
import 'preact/devtools';
import './styles.scss';
import Button from './components/Button';

render(
  <Button />,
  document.getElementById('app'),
);
