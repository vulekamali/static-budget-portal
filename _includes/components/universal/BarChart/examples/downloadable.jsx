import { h, render } from 'preact';
import BarChart from './../index.jsx';


function scripts() {
  const node = document.getElementById('responsive-download-chart-example-23-03');

  render(
    <BarChart
      scale={1.5}
      downloadable={{
        heading: 'Civilian Secretariat National department budget for 2018-19 National department budget for 2018-19',
        subHeading: 'National department budget for 2018-19',
        type: 'Programmes budgets',
      }}
      items={{ 'Test 1': [10], 'Test 2': [30], 'Test 3': [20] }}
      guides
      width={600}
    />,
    node,
  );
}


export default scripts();
