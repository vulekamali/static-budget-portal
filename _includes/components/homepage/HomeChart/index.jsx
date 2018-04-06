import { h } from 'preact';
import BarChart from './../../universal/BarChart/index.jsx';
import ValueBlocks from './../ValueBlocks/index.jsx';

export default function HomeChart(props) {
  const {
    items,
    width,
    mobile,
    hasNull,
  } = props;

  const { parentAction } = props;

  const withValues = (
    <div className="Section-card">
      <BarChart
        name="programmes-chart"
        guides={!mobile}
        hover={!mobile}
        {...{ width, parentAction, items }}
      />
    </div>
  );


  return hasNull ? <ValueBlocks {...{ items }} /> : withValues;
}
