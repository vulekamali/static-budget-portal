import { h } from 'preact';
import GraphContainer from './../../../universal/Graph/partials/GraphContainer.jsx';
import RevenueMarkup from './../../Revenue/partials/RevenueMarkup.jsx';


export default function ExpenditureMarkup({ items, year }) {

  const newItems = Object.keys(items).reduce(
    (results, key) => {
      return {
        ...results,
        [key]: items[key][0],
      };
    },
    {},
  );

  const hasNull = Object.keys(items).reduce(
    (results, key) => {
      return items[key][0] === null;
    },
    false,
  );

  if (hasNull) {
    return (
      <div className="Expenditure-wrap">
        <RevenueMarkup {...{ year }} items={newItems} />
        <div className="Expenditure-linkWrap">
          <a href="http://www.treasury.gov.za/documents/national%20budget/2017/default.aspx" className="Expenditure-link">Explore National and Provincial Expenditure by Department for {year}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="Expenditure-wrap Expenditure-wrap--graph">
      <GraphContainer {...{ items, year }} legend={[]} />

      <div className="Expenditure-linkWrap Expenditure-linkWrap--extra">
        <a href={`/${year}/departments`} className="Expenditure-link">Explore National and Provincial Expenditure by Department for {year}</a>
      </div>
    </div>
  );
}
