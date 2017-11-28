import { h } from 'preact';
import PseudoSelect from './../../PseudoSelect/index.jsx';


export default function Form({ state, eventHandlers }) {
  const provinces = [
    {
      title: 'All Provinces',
      value: 'all',
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
      value: 'all',
    },
    {
      title: 'National',
      value: 'national',
    },
    {
      title: 'Provincial',
      value: 'provincial',
    },
  ];

  const updateResults = event => eventHandlers.filterResults(event.target.value);
  const { updateFilter } = eventHandlers;
  const provinceFilter = (
    <div className="DeptSearch-filterGroup">
      <span className="DeptSearch-divider">in</span>
      <div className="DeptSearch-filter">
        <PseudoSelect
          name="province"
          items={provinces}
          property={state.province}
          open={state.open === 'province'}
          changeAction={value => updateFilter('province', value)}
        />
      </div>
    </div>
  );

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
        <div className="DeptSearch-filter">
          <PseudoSelect
            name="spheres"
            items={spheres}
            property={state.spheres}
            open={state.open === 'spheres'}
            changeAction={value => updateFilter('spheres', value)}
          />
        </div>
      </div>
      {state.spheres === 'provincial' ? provinceFilter : null }
    </div>
  );
}
