import { h } from 'preact';
import ResultsGroup from './ResultsGroup.jsx';


export default function ResultsBox({ search, initRequest, error, loading, results, focus, keywords, selectedYear, count }) {
  return (
    <div className={`Search-results${keywords.length > 2 && focus ? ' is-open' : ''}`}>
      { loading === null ? null : <ResultsGroup {...{ keywords, search, initRequest, error, results, loading, selectedYear, count }} /> }
    </div>
  );
}
