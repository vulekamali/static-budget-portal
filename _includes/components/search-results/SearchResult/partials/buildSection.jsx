import { h } from 'preact';
import buildNotice from './buildNotice.jsx';
import createLinkText from './createLinkText';


const calcSectionObj = (type) => {
  switch (type) {
    case 'green': return {
      modifiers: ' is-green',
      color: ' u-colorWhite',
    };

    case 'purple': return {
      modifiers: ' is-purple',
      color: ' u-colorWhite',
    };

    case 'grey': return {
      modifiers: '',
      color: '',
    };

    default: return {
      modifiers: null,
      cardModifiers: null,
    };
  }
};


const buildSnippet = (snippet, tab) => {
  return (
    <div>
      <div className="u-marginBottom20 u-lineHeight16" dangerouslySetInnerHTML={{ __html: snippet.text }} />
      <div>Source:&nbsp;</div>
      <a href={snippet.url}>{createLinkText(tab)}</a>
    </div>
  );
};

const buildItem = (tab, url, title, snippet) => {
  return (
    <div className="Grid-item is-1of3">
      <a className="Section-title" href={url} dangerouslySetInnerHTML={{ __html: title }} />
      {snippet ? buildSnippet(snippet, tab) : null}
    </div>
  );
};


const createOtherYears = (otherYears, color) => {
  return (
    <div className="Section-card is-invisible u-paddingBottom15">
      <div className="SearchResult-buttons">
        <div className="SearchResult-buttonsTitle">
          <div className={`Section-title${color}`}>See more results</div>
        </div>
        {
          otherYears.map(({ name, url, count: innerCount }) => {
            return (
              <div className="SearchResult-buttonItem">
                <a href={url} className="Button is-secondary is-inline">
                  <span>{name}</span>
                  <span className="u-fontWeightNormal">&nbsp;({innerCount} results)</span>
                </a>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};


export default function buildSection(type, items, count, tab, otherYears, error) {
  const { modifiers, color } = calcSectionObj(type);
  const validAmount = items.length;

  return (
    <div className={`Section is-bevel${modifiers}`}>
      <div className="Section-card u-paddingBottom0">
        <div className="Grid has-standardTrigger u-marginBottom30">
          <div className="Grid-inner">
            {
              error ? null : items.map(({ title, url, snippet }) => {
                return buildItem(tab, url, title, snippet);
              })
            }
            {
              buildNotice(error, validAmount)
            }
          </div>
        </div>
      </div>
      {otherYears.length > 0 ? createOtherYears(otherYears, color) : null}
    </div>
  );
}
