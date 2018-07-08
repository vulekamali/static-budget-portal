import React from 'react';
import ReactDropdown from './../../ReactDropdown';
import ReactLoader from './../../ReactLoader';


export default function Markup ({ languages, selected, setSelected }) {
  const options = Object.keys(languages);

  return (
    <div className="ReactVideoEmbed-modal">
      <div className="ReactVideoEmbed-embed">
        <div className="ReactVideoEmbed-embedInner">
          <ReactLoader />
        </div>
        <iframe title="ReactVideoEmbed-iframe" className="ReactVideoEmbed-iframe" width="560" height="315" src={`https://www.youtube.com/embed/${languages[selected]}?rel=0&amp;amp;showinfo=0`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
      </div>
      {options.length > 1 && <ReactDropdown onChange={setSelected} {...{ selected, options }}/>}
    </div>
  );
}