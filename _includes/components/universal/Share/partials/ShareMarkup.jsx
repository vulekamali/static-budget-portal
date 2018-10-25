import { h } from 'preact';
import Button from './Button.jsx';

export default function ShareMarkup({ selected, anchor, updateShare, purple }) {
  return (
    <div className="Share-wrap">
      <div className="Share-action">
        <div className="Share-select">
          <select
            className="Share-dropdown"
            onChange={event => updateShare(event.target.value)}
          >
            <option value="link" selected={selected === 'link'}>as Link</option>
            <option value="facebook" selected={selected === 'facebook'}>on Facebook</option>
            <option value="twitter" selected={selected === 'twitter'}>on Twitter</option>
          </select>
        </div>
        <div className="Share-button">
          <Button {...{ selected, anchor, purple }} />
        </div>
      </div>
    </div>
  );
}
