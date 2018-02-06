import { h } from 'preact';
import CloseIcon from './CloseIcon.jsx';
import PseudoSelect from './../../../universal/PseudoSelect/index.jsx';

export default function Modal(props) {
  const { open, title, description, languageOptions } = props;
  const { setModal, setLanguage } = props;
  const closeModal = () => setModal(false);

  const selectOptions = Object.keys(languageOptions).map((language) => {
    return {
      title: language.charAt(0).toUpperCase() + language.slice(1),
      value: languageOptions[language],
    };
  });

  return (
    <div className="Videos-modalWrap">
      <div className="Videos-modal">
        <div className="Videos-modalBox">
          <div className="Videos-modalClose" onClick={closeModal} >
            <CloseIcon />
          </div>
          <div className="Videos-modalTitle">{title}</div>
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
      </div>
    </div>
  );
}
