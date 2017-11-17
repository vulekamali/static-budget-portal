import { h } from 'preact';
import ResultsGroup from './ResultsGroup.jsx';


export default function ResultsBox({ loading, results, focus, keywords }) {
  return (
    <div className={`Search-results${keywords.length > 3 && focus ? ' is-open' : ''}`}>
      <ResultsGroup {...{ results, loading }} />
    </div>
  );
}