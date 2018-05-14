import { h } from 'preact';
import TabSelection from './TabSelection.jsx';
import LandingLayout from './LandingLayout.jsx';
import FacetLayout from './FacetLayout.jsx';
import tabOptions from './tabOptions.json';


export default function SearchPage(props) {
  const {
    phrase, 
    tab,
    updateTab,
    year,
    items: rawItems,
    loading,
    page,
    addPage,
    loadingPage,
    error,
  } = props;

  const items = rawItems || [];

  const determineLayout = (innerTab) => {
    if (innerTab === 'all') {
      return <LandingLayout {...{ items, year, error, updateTab }} />;
    }

    const buttonCss = [
      'Button',
      'is-secondary',
      'is-inline',
      (loadingPage ? 'is-loading' : null),
    ].join(' ');

    const button = <button className={buttonCss} onClick={addPage}>Show more</button>;

    return (
      <div>
        <FacetLayout
          count={items.count}
          items={items.items}
          tab={tabOptions[tab]}
          tabKey={tab}
          {...{ year, error }}
        />
        <div className="u-textAlignCenter">
          {items.count > page * 5 ? button : null}
        </div>
      </div>
    );
  };

  const loader = <div className="Loader u-marginTop50 u-marginLeftAuto u-marginRightAuto" />;

  return (
    <div className="SearchPage">
      <div className="Page-title u-textAlignCenter">Search results for &quot;{phrase}&quot;</div>
      <TabSelection {...{ tab, updateTab, tabOptions }} />
      {loading ? loader : determineLayout(tab)}
    </div>
  );
}
