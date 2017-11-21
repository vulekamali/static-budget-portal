import { h } from 'preact';
import Form from './Form.jsx';
import Results from './Results.jsx';


export default function DeptSearchMarkup({ state, eventHandlers }) {
  return (
    <div className="DeptSearch-wrap">
      <h3 className="u-sReadOnly">Filters</h3>
      <ul className="DeptSearch-list">
        <li>
          <Form {...{ state, eventHandlers }} />
        </li>
      </ul>
      <h3 className="u-sReadOnly">Results</h3>
      <Results {...{ state }} />
    </div>
  );
}
