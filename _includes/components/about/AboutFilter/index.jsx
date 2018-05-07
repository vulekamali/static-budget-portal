import { h } from 'preact';

const buildCard = (section) => {
  return (cardTitle) => {
    const text = section[cardTitle];

    return (
      <div className="u-marginBottom20">
        <div className="Section">
          <h4 className="Section-title">{cardTitle}</h4>
          <div className="js-tooltips" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    );
  };
};

const buildSection = (obj) => {
  return (sectionTitle) => {
    const section = obj[sectionTitle];
    const cardTitlesList = Object.keys(section);

    return (
      <div>
        <div className="Section is-invisible u-paddingBottom5">
          <h3 className="Page-subHeading">{sectionTitle}</h3>
        </div>

        <div>
          {cardTitlesList.map(buildCard(section))}
        </div>
      </div>
    );
  };
};


export default function FaqFilter({ results, phrase, updatePhrase}) {
  const updatePhraseWrap = event => updatePhrase(event.target.value);
  const sectionNamesList = Object.keys(results);

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
      {sectionNamesList.map(buildSection(results))}
    </div>
  );
}
