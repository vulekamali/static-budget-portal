import { h } from 'preact';
import Select from './Select.jsx';


export default function Form({ state, eventHandlers }) {
  const provinces = [
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

  const spheres = [
    {
      title: 'All Spheres',
      value: null,
    },
    {
      title: 'National',
      value: '2',
    },
    {
      title: 'Provincial',
      value: '3',
    },
  ]

  const updateResults = event => eventHandlers.filterResults(event.target.value);
  const { updateFilter, openFilter } = eventHandlers;

  return (
    <div className="DeptSearch-form">
      <input
        value={state.keywords}
        className="DeptSearch-keywords"
        placeholder="Find a department"
        onInput={updateResults}
      />

      <div className="DeptSearch-filterGroup">
        <span className="DeptSearch-divider">in</span>
        <Select
          update={updateFilter}
          open={openFilter}
          items={spheres}
          filter="spheres"
          state={state.spheres}
        />
      </div>

      <div className="DeptSearch-filterGroup">
        <span className="DeptSearch-divider">in</span>
        <Select
          update={updateFilter}
          open={openFilter}
          items={provinces}
          filter="province"
          state={state.province}
        />
      </div>
    </div>
  );
}
