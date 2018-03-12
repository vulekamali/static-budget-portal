import { h } from 'preact';
import PseudoSelect from './../../universal/PseudoSelect/index.jsx';


const hardCoded = {
  'as Link': 'copy',
  'on Facebook': 'facebook',
  'on Twitter': 'twitter',
};


export default function ShareMarkup({ items, children, selected, changeAction, clickAction, open, name }) {

  return (
    <div className="SelectWithButton">
      <div className="SelectWithButton-select">
        <PseudoSelect
          name={`${name}-select-with-button`}
          changeAction={value => changeAction(value)}
          {...{ open, selected, items }}
        />
      </div>
      <div className="Share-button">
        {{ children }}
      </div>
    </div>
  );
}
