import { h } from 'preact';


export default function FaqFilter({ results, phrase, updatePhrase}) {
  const updatePhraseWrap = event => updatePhrase(event.target.value);

  return (
    <div>
      <div className="Section is-invisible">
        <div className="u-maxWidth300">
          <input
            value={phrase}
            onInput={updatePhraseWrap}
            className="Input"
            placeholder="Start typing to find a specific question"
          />
        </div>
      </div>
      {
        results.map(({ title, text }) => {
          return (
            <div className="u-marginBottom20">
              <div className="Section">
                <h2 className="Section-title" dangerouslySetInnerHTML={{ __html: title }} />
                <div dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
