import { h } from 'preact';
import PseudoSelect from './../../../universal/PseudoSelect/index.jsx';


export default function Modal({ open, languageOptions, setLanguage }) {
  const selectOptions = Object.keys(languageOptions).map((language) => {
    return {
      title: language,
      value: languageOptions[language],
    };
  });

  return (
    <div className="Videos">
      <div className="Videos-embed">
        <div className="Videos-loading" />
        <iframe className="Videos-iframe" width="560" height="315" src={`https://www.youtube.com/embed/${open.language}?rel=0&amp;amp;showinfo=0`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="allowfullscreen" />
      </div>
      <span className="Videos-label">
        Change language:
      </span>
      <div className="Videos-selectWrap">
        <PseudoSelect
          name="language"
          open={open.select}
          items={selectOptions}
          property={open.language}
          changeAction={value => setLanguage(value)}
        />
      </div>
    </div>
  );
}
