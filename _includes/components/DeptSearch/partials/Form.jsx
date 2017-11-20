import { h } from 'preact';
import Select from './Select.jsx';


export default function Form({ state, eventHandlers }) {
  const items = [
    {
      title: 'All Provinces',
      value: null,
    },
    {
      title: 'Eastern Cape',
      value: 'eastern-cape',
    },
    {
      title: 'Free State',
      value: 'free-state',
    },
    {
      title: 'Gauteng',
      value: 'gauteng',
    },
    {
      title: 'KwaZulu-Natal',
      value: 'kwazulu-natal',
    },
    {
      title: 'Limpopo',
      value: 'limpopo',
    },
    {
      title: 'Mpumalanga',
      value: 'mpumalanga',
    },
    {
      title: 'North West',
      value: 'north-west',
    },
    {
      title: 'Northern Cape',
      value: 'northern-cape',
    },
    {
      title: 'Western Cape',
      value: 'western-cape',
    },
  ];

  const updateResults = event => eventHandlers.filterResults(event.target.value);

  return (
    <div className="DeptSearch-form">
      <input
        value={state.keywords}
        className="DeptSearch-keywords"
        placeholder="Find a department"
        onInput={updateResults}
      />
      <span className="DeptSearch-divider">in</span>
      <Select {...{ items, eventHandlers }} state={state.province} />
    </div>
  );
}
