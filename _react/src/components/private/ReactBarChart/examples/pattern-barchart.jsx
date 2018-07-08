import { h, render } from 'preact';
import ReactBartChart from './../index.jsx';


function pattern() {
  const basic = document.getElementById('pattern-ReactBartChart-basic');
  const ReactDownload = document.getElementById('pattern-ReactBartChart-ReactDownload');
  const multiple = document.getElementById('pattern-ReactBartChart-multiple');
  const no = document.getElementById('pattern-ReactBartChart-no');

  if (basic) {
    render(
      <ReactBartChart
        items={{ 'Test 1': [10], 'Test 2': [30], 'Test 3': [20] }}
        width={300}
        hover
        guides
      />,
      basic,
    );
  }

  if (multiple) {
    render(
      <ReactBartChart
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
      <ReactBartChart
        items={{ 'Test 1': [10], 'Test 2': [30], 'Test 3': [20] }}
        width={700}
      />,
      no,
    );
  }

  if (ReactDownload) {
    render(
      <ReactBartChart
        items={{ 'Test 1': [10], 'Test 2': [30], 'Test 3': [20] }}
        width={600}
        scale={1.5}
        ReactDownload={{
          heading: 'Test ReactHeading',
          subReactHeading: 'Sub ReactHeading Test',
          type: 'Type Test',
        }}
      />,
      ReactDownload,
    );
  }
}


export default pattern();
