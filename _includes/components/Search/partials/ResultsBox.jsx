import { h } from 'preact';
import ResultsGroup from './ResultsGroup.jsx';


export default function ResultsBox({ loading, results, focus, keywords, selectedYear, count }) {
  return (
    <div className={`Search-results${keywords.length > 3 && focus ? ' is-open' : ''}`}>
      { loading === null ? null : <ResultsGroup {...{ results, loading, selectedYear, count }} /> }
    </div>
  );
}
