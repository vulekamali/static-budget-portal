import { h, render } from 'preact';
import LineChart from './../index.jsx';


function pattern() {
  const basic = document.getElementById('pattern-linechart-basic');

  if (basic) {
    render(
      <LineChart
        items={{ 'Test 1': [10], 'Test 2': [30], 'Test 3': [20] }}
        width={300}
        hover
        guides
      />,
      basic,
    );
  }
}


export default pattern();
