import { h } from 'preact';
import ResultsGroup from './ResultsGroup.jsx';


export default function ResultsBox({ initRequest, error, loading, results, focus, keywords, selectedYear, count }) {
  return (
    <div className={`Search-results${keywords.length > 3 && focus ? ' is-open' : ''}`}>
      { loading === null ? null : <ResultsGroup {...{ initRequest, error, results, loading, selectedYear, count }} /> }
    </div>
  );
}
