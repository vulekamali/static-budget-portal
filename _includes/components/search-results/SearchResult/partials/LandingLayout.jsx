import { h } from 'preact';
import buildSection from './buildSection.jsx';
import tabOptions from './TabOptions.json';


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

  const provItems = provincial.items || [];
  const provCount = provincial.count;
  const provOtherYears = provincial.otherYears || [];
  const natItems = national.items || [];
  const natCount = national.count;
  const natOtherYears = national.otherYears || [];


  return (
    <div>
      <div className="u-marginBottom20">
        {buildHeading(year, 'national', natCount, updateTab)}
        {buildSection('grey', natItems, natCount, 'national', natOtherYears, error)}
      </div>
      <div className="u-marginBottom20">
        {buildHeading(year, 'provincial', provCount, updateTab)}
        {buildSection('purple', provItems, provCount, 'provincial', provOtherYears, error)}
      </div>
    </div>
  );
}
