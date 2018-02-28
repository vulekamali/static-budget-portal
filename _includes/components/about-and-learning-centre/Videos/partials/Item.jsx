import { h } from 'preact';
import PlayIcon from './PlayIcon.jsx';
import trimString from './trimString.js';


export default function Item({ id, title, description, languages, setModal }) {
  const languageKeys = Object.keys(languages);
  const setModalWrapper = () => setModal(true, id, languages[languageKeys[0]]);
  const languageButtons = Object.keys(languages).reduce(
    (result, key) => {
      return [
        ...result,
        {
          name: key,
          action: () => setModal(true, id, languages[key]),
        },
      ];
    },
    [],
  );

  return (
    <li className="u-listItemReset">
      <span className="Videos-item">
        <a className="Videos-thumbnailWrap" onClick={setModalWrapper} >
          <div className="Videos-iconWrap">
            <PlayIcon />
          </div>
          <img className="Videos-thumbnail" src={`https://img.youtube.com/vi/${languages[languageKeys[0]]}/mqdefault.jpg`} alt="" />
        </a>
        <ul className="Videos-info">
          <li className="Videos-title">{title}</li>
          <li className="u-listItemReset">
            <ul className="u-listReset">
              {languageButtons.map(({ name, action }) => <li className="Videos-pillWrap"><a onClick={action} className="Button is-small is-inline u-marginRight u-marginRight--5">{name}</a></li>)}
            </ul>
          </li>
          <li className="Videos-description">{description.length > 200 ? trimString(200, description) : description }</li>
        </ul>
      </span>
    </li>
  );
}
