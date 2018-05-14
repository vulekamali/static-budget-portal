import { h } from 'preact';
import Section from './Section.jsx';
import tabOptions from './tabOptions.json';


const viewAll = (updateTabWrap, count) => {
  return (
    <div className="SearchResult-rightHeading">
      <button className="Page-title u-margin0 u-borderWidth0 u-backgroundNone u-textDecorationUnderline u-cursorPointer" onClick={updateTabWrap}>
        <span className="u-fontWeightNormal">See All&nbsp;</span>
        <span>{count}</span>
        <span className="u-fontWeightNormal">&nbsp;&gt;</span>
      </button>
    </div>
  );
};

const buildHeading = (year, tab, count, updateTab) => {
  const updateTabWrap = () => updateTab(tab, true);

  return (
    <div className="Section is-invisible u-paddingBottom0">
      <div className="SearchResult-heading">
        <div className="SearchResult-leftHeading">
          <div className="Page-title u-margin0">Found in {year} {tabOptions[tab]}</div>
        </div>
        {count > 3 ? viewAll(updateTabWrap, count) : null}
      </div>
    </div>
  );
};


export default function LandingLayout({ items: rawItems, year, error, updateTab }) {
  const items = rawItems || {};
  const provincial = items.provincial || {};
  const national = items.national || {};
  const contributed = items.contributed || {};

  return (
    <div>
      <div className="u-marginBottom20">
        {buildHeading(year, 'cso', contributed.count, updateTab)}
        <Section
          type="green"
          items={contributed.items || []}
          count={contributed.count}
          tab="cso"
          otherYears={[]}
          {...{ error }}
        />
      </div>

      <div className="u-marginBottom20">
        {buildHeading(year, 'national', national.count, updateTab)}
        <Section
          type="grey"
          items={national.items || []}
          count={national.items}
          tab="national"
          otherYears={national.otherYears || []}
          {...{ error }}
        />
      </div>

      <div className="u-marginBottom20">
        {buildHeading(year, 'provincial', provincial.count, updateTab)}
        <Section
          type="purple"
          items={provincial.items || []}
          count={provincial.items}
          tab="national"
          otherYears={provincial.otherYears || []}
          {...{ error }}
        />
      </div>
    </div>
  );
}
