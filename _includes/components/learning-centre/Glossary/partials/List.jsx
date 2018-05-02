import { h } from 'preact';


export default function List({ currentPhrase, currentItems }) {

  const buildItems = (letterArrayFn) => {
    return letterArrayFn.map((item) => {
      return (
        <div className="Glossary-item">
          <div className="Glossary-title">{item.phrase}</div>
          <div className="Glossary-text">{item.description}</div>
        </div>
      );
    });
  };


  const buildSections = (currentItemsFn) => {
    return Object.keys(currentItemsFn).map((letter) => {
      const letterArray = currentItemsFn[letter];

      if (letterArray.length > 0) {
        return (
          <div className="Glossary-section" id={`glossary-item-${letter}`}>
            <div className="Glossary-heading">
              {letter.toUpperCase()}
            </div>
            {buildItems(letterArray)}
          </div>
        );
      }

      return null;
    });
  };


  return (
    <div className="Glossary-list">
      {buildSections(currentItems)}
    </div>
  );
}
