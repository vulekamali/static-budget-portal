import { h } from 'preact';
import createLinkText from './createLinkText.js';


const buildSnippet = (snippet, tabKey) => {
  if (tabKey === 'cso' && !snippet.organization) {
    return null;
  }
  return (
    <div>
      <div className="u-marginBottom20 Result" dangerouslySetInnerHTML={{ __html: snippet.text }} />
      <div>
        <span>Source:&nbsp;</span>
        <a target="_blank" href={snippet.url}>{createLinkText(tabKey, snippet.organization)}</a>
      </div>
    </div>
  );
};

const buildItem = (tabKey) => {
  return ({ title, url, snippet }) => {
    return (
      <div key={url} className="Section u-marginBottom20 is-invisible">
        <a href={url} className="Section-title" dangerouslySetInnerHTML={{ __html: title }} />
        {snippet ? buildSnippet(snippet, tabKey) : null}
      </div>
    );
  };
};


export default function FacetLayout({ count, items: rawItems, year, tab, tabKey, error }) {
  const items = rawItems || [];

  if (error) {
    return (
      <div className="u-textAlignCenter">
        <div className="Page-title u-marginBottom0">Something went wrong</div>
        <div className="Section-title u-marginBottom20">Please try again at a later point.</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="u-textAlignCenter">
        <div className="Page-title u-marginBottom0">We found no results</div>
        <div className="Section-title u-marginBottom20">Try changing the searched year, or broaden your search terms.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="Section is-invisible">
        <div className="Section-title">
          <span className="u-fontWeightNormal">All {count} results found in&nbsp;</span>
          <span>{tab} for {year}</span>
        </div>
      </div>
      {items.map(buildItem(tabKey))}
    </div>
  );
}
