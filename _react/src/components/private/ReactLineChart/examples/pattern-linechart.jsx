import { h, render } from 'preact';
import ReactLineChart from './../index.jsx';


function pattern() {
  const basic = document.getElementById('pattern-ReactLineChart-basic');
  const multiple = document.getElementById('pattern-ReactLineChart-multiple');
  const no = document.getElementById('pattern-ReactLineChart-no');

  if (basic) {
    render(
      <ReactLineChart
        items={{ 'Test 1': [10], 'Test 2': [30], 'Test 3': [20] }}
        width={500}
        hover
        guides
      />,
      basic,
    );
  }

  if (multiple) {
    render(
      <ReactLineChart
        items={{ 'Test 1': [10, 50, 0], 'Test 2': [30, 10, 40], 'Test 3': [20, 0, 10] }}
        width={600}
        hover
        guides
      />,
      multiple,
    );
  }

  if (no) {
    render(
      <ReactLineChart
        items={{ 'Test 1': [10], 'Test 2': [30], 'Test 3': [20] }}
        width={700}
      />,
      no,
    );
  }
}


export default pattern();
