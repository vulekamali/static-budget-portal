import { h } from 'preact';
import Form from './Form.jsx';
import ResultsBox from './ResultsBox.jsx';


export default function SearchMarkup({ initRequest, error, state, eventHandlers, selectedYear }) {
  const { loading, focus, keywords, results, count } = state;

  return (
    <div className={`Search-wrap ${focus ? ' is-focused' : ''}`}>
      <Form {...{ eventHandlers, keywords, selectedYear }} />
      <ResultsBox {...{ error, loading, results, focus, keywords, selectedYear, count, initRequest }} />
    </div>
  );
}
