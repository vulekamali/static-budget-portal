import { h } from 'preact';


export default function TabSelection({ tab, updateTab, tabOptions }) {
  const items = Object.keys(tabOptions).map((key) => {
    const value = tabOptions[key];
    const className = [
      'SearchPage-tabItem',
      (key === tab ? 'is-active' : ''),
    ].join(' ');
    const updateTabWrap = () => updateTab(key);

    return <button {...{ className, key }} onClick={updateTabWrap}>{value}</button>;
  });

  return (
    <div className="SearchPage-tabWrap">
      <div className="SearchPage-tabList">
        {items}
      </div>
    </div>
  );
}