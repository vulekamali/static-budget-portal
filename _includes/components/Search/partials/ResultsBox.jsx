import { h } from 'preact';
import ResultsGroup from './ResultsGroup.jsx';


export default function ResultsBox({ loading, results, focus, keywords, selectedYear }) {
  return (
    <div className={`Search-results${keywords.length > 3 && focus ? ' is-open' : ''}`}>
      <ResultsGroup {...{ results, loading, selectedYear }} />
    </div>
  );
}