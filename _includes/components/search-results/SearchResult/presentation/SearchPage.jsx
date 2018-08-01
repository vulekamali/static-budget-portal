import { h } from 'preact';
import TabSelection from './TabSelection.jsx';
import LandingLayout from './LandingLayout.jsx';
import FacetLayout from './FacetLayout.jsx';
import tabOptions from './../data/tabOptions.json';


function calcContent(props) {
  const { error, loading } = props;
  const { updateTab, addPage } = props;
  const { tab, year, response, page } = props;
  const { count, items } = response || {};

  if (error) {
    return (
      <div className="SearchResult-card is-dark u-marginTop25">
        <div className="SearchResult-cardTitle">Something went wrong</div>
        <div>Please try again at a later point.</div>
      </div>
    );
  }

  if (loading) {
    return <div className="Loader u-marginTop50 u-marginLeftAuto u-marginRightAuto" />;
  }

  if (count < 1) {
    return (
      <div className="SearchResult-card is-dark u-marginTop25">
        <div className="SearchResult-cardTitle">We found no results</div>
        <div>Try changing the searched year, or broaden your search terms.</div>
      </div>
    );
  }

  if (tab === 'all') {
    return <LandingLayout {...{ response, year, error, updateTab }} />;
  }

  return (
    <FacetLayout
      tab={tabOptions[tab]}
      tabKey={tab}
      {...{ addPage, page, year, error, count, items }} 
    />
  );
}


export default function SearchPage(props) {
  const { tab, updateTab, phrase } = props;
  return (
    <div className="SearchResult">
      <div className="Page-title u-textAlignCenter">Search results for &quot;{phrase}&quot;</div>
      <TabSelection {...{ tab, updateTab, tabOptions }} />
      {calcContent(props)}
    </div>
  );
}
