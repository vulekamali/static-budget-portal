import { h } from 'preact';
import Form from './Form.jsx';
import ResultsBox from './ResultsBox.jsx';


export default function SearchMarkup({ fullLoading, search, initRequest, error, state, eventHandlers, selectedYear }) {
  const { loading, focus, keywords, results, count } = state;

  if (fullLoading) {
    return (
      <div className="Search-wrap">
        <div className="Search-form is-loading" />
      </div>
    );
  }

  return (
    <div className="Search-function">
      <div className={`Search-wrap ${focus ? ' is-focused' : ''}`}>
        <Form {...{ eventHandlers, keywords, selectedYear }} />
        <ResultsBox {...{ search, error, loading, results, focus, keywords, selectedYear, count, initRequest }} />
      </div>
    </div>
  );
}
