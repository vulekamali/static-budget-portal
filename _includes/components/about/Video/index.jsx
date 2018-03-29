import { h } from 'preact';
import PseudoSelect from './../../universal/PseudoSelect/index.jsx';


export default function Modal({ open, languageOptions, setLanguage }) {
  const toggle = (
    <div>
      <span className="Video-label">
        Change language:
      </span>
      <div className="Video-selectWrap">
        <PseudoSelect
          name="language"
          open={open.select}
          items={languageOptions}
          selected={open.language}
          changeAction={value => setLanguage(value)}
        />
      </div>
    </div>
  );

  return (
    <div className="Video">
      <div className="Video-embed">
        <div className="Video-loading" />
        <iframe title="Video" className="Video-iframe" width="560" height="315" src={`https://www.youtube.com/embed/${open.language}?rel=0&amp;amp;showinfo=0`} frameBorder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen" />
      </div>
      { Object.keys(languageOptions).length > 1 ? toggle : null }
    </div>
  );
}
