import { h } from 'preact';
import PseudoSelect from './../../PseudoSelect/index.jsx';
import Button from './Button.jsx';


const hardCoded = [
  {
    value: 'copy',
    title: 'as Link',
  },
  {
    value: 'facebook',
    title: 'on Facebook',
  },
  {
    value: 'twitter',
    title: 'on Twitter',
  },
];


export default function ShareMarkup({ selected, updateShare, shareOpen }) {
  return (
    <div className="Share-wrap">
      <div className="Share-action">Share page</div>
      <div className="Share-selectWrap">
        <div className="Share-select">
          <PseudoSelect
            name="test"
            items={hardCoded}
            property={selected}
            open={shareOpen}
            changeAction={value => updateShare(value)}
            block
          />
        </div>
        <Button {...{ selected }} />
      </div>
    </div>
  );
}
