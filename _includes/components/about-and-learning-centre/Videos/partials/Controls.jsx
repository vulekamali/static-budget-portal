import { h } from 'preact';


export default function CloseIcon({ currentPhrase, changePhrase, languageOptions }) {
  return (
    <div>
      <input
        value={currentPhrase}
        className="Videos-input"
        placeholder="Start typing to find a video"
        onInput={event => changePhrase(event.target.value)}
      />
    </div>
  );
}
