import { h } from 'preact';
import BarChart from './../../BarChart/index.jsx';
import LineChart from './../../LineChart/index.jsx';


export default function Markup(props) {
  const {
    width,
    type,
    items,
  } = props;

  const { parentAction } = props;

  if (type === 'bar') {
    return (
      <BarChart
        guides
        hover
        scale={1}
        {...{ parentAction, items, width }}
      />
    );
  }

  if (type === 'line') {
    return (
      <LineChart
        guides
        hover
        {...{ parentAction, width, items }}
      />
    );
  }
}
