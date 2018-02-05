import { h } from 'preact';
import PlayIcon from './PlayIcon.jsx';
import trimString from './trimString.js';


export default function Item({ id, title, description, languages, setModal }) {
  const languageKeys = Object.keys(languages);
  const setModalWrapper = () => setModal(true, id, languages[languageKeys[0]]);

  return (
    <li className="u-listItemReset">
      <a className="Videos-item" onClick={setModalWrapper} >
        <div className="Videos-thumbnailWrap">
          <div className="Videos-iconWrap">
            <PlayIcon />
          </div>
          <img className="Videos-thumbnail" src={`https://img.youtube.com/vi/${languages[languageKeys[0]]}/mqdefault.jpg`} alt="" />
        </div>
        <ul className="Videos-info">
          <li className="Videos-title">{title}</li>
          <li className="u-listItemReset">
            <ul className="u-listReset">
              {languageKeys.map(key => <li className="Videos-pill">{key}</li>)}
            </ul>
          </li>
          <li className="Videos-description">{description.length > 200 ? trimString(200, description) : description }</li>
        </ul>
      </a>
    </li>
  );
}
