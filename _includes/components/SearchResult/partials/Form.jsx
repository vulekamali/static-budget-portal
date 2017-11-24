import { h } from 'preact';
import Select from './Select.jsx';


export default function Form({ state, updateFilter }) {
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

  return (
    <div className="SearchResult-form">
      <Select {...{ items, updateFilter }} state={state.province} />
    </div>
  );
}
