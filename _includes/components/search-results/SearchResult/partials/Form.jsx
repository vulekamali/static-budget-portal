import { h } from 'preact';
import PseudoSelect from './../../../universal/PseudoSelect/index.jsx';


export default function Form({ state, updateFilter }) {
  const items = {
    'All Provinces': 'all',
    'Free State': 'free-State',
    Gauteng: 'gauteng',
    'KwaZulu-Natal': 'kwazulu-natal',
    Limpopo: 'limpopo',
    Mpumalanga: 'mpumalanga',
    'North West': 'north-west',
    'Northern Cape': 'northern-cape',
    'Western Cape': 'western-cape',
  };

  return (
    <div className="SearchResult-form">
      <div className="SearchResult-filter">
        <PseudoSelect
          name="province"
          items={items}
          selected={state.province}
          open={state.open === 'province'}
          changeAction={value => updateFilter('province', value)}
        />
      </div>
    </div>
  );
}
