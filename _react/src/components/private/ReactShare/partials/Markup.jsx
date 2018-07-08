import React from 'react';
import Button from './Button.jsx';


export default function Markup({ selected, anchor, updateShare, showLink }) {
  return (
    <div className="Share-wrap">
      <div className="Share-action">
        <div className="Share-select">
          <select
            className="Share-ReactDropdown"
            onChange={event => updateShare(event.target.value)}
            value={selected}
          >
            <option value="link">as Link</option>
            <option value="facebook">on Facebook</option>
            <option value="twitter">on Twitter</option>
          </select>
        </div>
        <div className="Share-button">
          <Button {...{ selected, anchor, showLink }} />
        </div>
      </div>
    </div>
  );
}
