import { h } from 'preact';
import BarChart from './../../BarChart/index.jsx';
import LineChart from './../../LineChart/index.jsx';


export default function Markup(props) {
  const {
    width,
    type,
    items,
    guides,
    hover,
  } = props;

  const { parentAction } = props;

  if (type === 'bar') {
    return (
      <BarChart
        scale={1}
        {...{ parentAction, items, width, guides, hover }}
      />
    );
  }

  if (type === 'line') {
    return (
      <LineChart
        {...{ parentAction, width, items, guides, hover }}
      />
    );
  }
}
