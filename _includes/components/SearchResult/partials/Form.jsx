import { h } from 'preact';
import PseudoSelect from './../../PseudoSelect/index.jsx';


export default function Form({ state, updateFilter }) {
  const items = [
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

  return (
    <div className="SearchResult-form">
      <div className="SearchResult-filter">
        <PseudoSelect
          name="province"
          items={items}
          property={state.province}
          open={state.open === 'province'}
          changeAction={value => updateFilter('province', value)}
        />
      </div>
    </div>
  );
}
