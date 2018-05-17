import { h } from 'preact';
import ItemPreview from './ItemPreview.jsx';


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
      {items.map(({ title, url, snippet }) => <ItemPreview tab={tabKey} {...{ url, title, snippet }} />)}
    </div>
  );
}
