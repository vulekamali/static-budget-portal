import { h } from 'preact';
import Form from './Form.jsx';
import ResultsBox from './ResultsBox.jsx';


export default function SearchMarkup({ state, eventHandlers }) {
  const { loading, focus, keywords, results } = state;

  return (
    <div className={`Search-wrap ${focus ? ' is-focused' : ''}`}>
      <Form {...{ eventHandlers, keywords }} />
      <ResultsBox {...{ loading, results, focus, keywords }} />
    </div>
  );
}
