import { h } from 'preact';
import Form from './Form.jsx';
import Results from './Results.jsx';


export default function DeptSearchMarkup({ state, eventHandlers }) {
  return (
    <div className="DeptSearch-wrap">
      <Form {...{ state, eventHandlers }} />
      <Results {...{ state }} />
    </div>
  );
}
