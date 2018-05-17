import { h } from 'preact';
import PropTypes from 'prop-types';


const buildToggle = (activeKey, setActiveKey, languages) => {
  const changeWrapper = event => setActiveKey(event.target.value);
  const keys = Object.keys(languages);
  const buildOption = key => <option value={key}>{key}</option>;

  return (
    <select
      className="Dropdown"
      selected={activeKey}
      onChange={changeWrapper}
    >
      {keys.map(buildOption)}
    </select>
  );
};


const buildVideo = (id) => {
  return (
    <div className="Video-embed">
      <div className="Video-loader">
        <div className="Loader" />
      </div>
      <iframe
        title="Video"
        className="Video-iframe"
        src={`https://www.youtube.com/embed/${id}?rel=0&amp;amp;showinfo=0`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </div>
  );
};


export default function Embed({ activeKey, setActiveKey, languages }) {
  const id = languages[activeKey];

  return (
    <div className="Video">
      {buildVideo(id)}
      {buildToggle(activeKey, setActiveKey, languages)}
    </div>
  );
}


Embed.propTypes = {
  activeKey: PropTypes.string.isRequired,
  setActiveKey: PropTypes.string.isRequired,
  languages: PropTypes.objectOf(PropTypes.string).isRequired,
};
