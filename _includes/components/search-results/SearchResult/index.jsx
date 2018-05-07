import { h } from 'preact';
import { findIndex } from 'lodash';
import OtherYears from './../OtherYears/index.jsx';


export default function SearchResultMarkup(props) {
  const {
    results,
    shown,
    province,
    error,
    loading,
    otherYears,
    count,

    search,
    selectedYear,

    updateItem,
  } = props;


  if (error) {
    return (
      <div className="SearchResult-wrap">
        <span>Something went wrong with the search. Please try again at a later point.</span>
      </div>
    );
  }

  const buildRatio = (count) => {
    return (
      <div className="SearchResult-title">
        Suggested Department Budgets ({count} found)
      </div>
    );
  };

  const buildResults = (results, placeholder) => {
    if (placeholder) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
        return (
          <span className="SearchResult-link">
            &nbsp;
          </span>
        );
      });
    }

    return results.map((item) => {
      const isProvince = item.province.length > 0;
      const departmentType = isProvince > 0 ? item.province : 'National';
      const extras = item.extras;
      const nameSlug = extras[findIndex(extras, ({ key }) => key === 'department_name_slug')].value;
      const name = extras[findIndex(extras, ({ key }) => key === 'Department Name')].value;

      const buildUrl = () => {
        if (isProvince) {
          const provSlug = extras[findIndex(extras, ({ key }) => key === 'geographic_region_slug')].value;
          return `/${selectedYear}/provincial/${provSlug}/departments/${nameSlug}`;
        }
        return `/${selectedYear}/national/departments/${nameSlug}`;
      };

      return (
        <a href={buildUrl()} className="SearchResult-link">
          {departmentType} Department: {name}
        </a>
      );
    });
  };

  return (
    <div className="SearchResult-wrap">
      <div className="u-marginBottom25 u-marginTop5">
        {otherYears ?
          <OtherYears
            items={otherYears}
            {...{ search, selectedYear }}
          /> :
          null
        }
      </div>

      <div className="SearchResult-heading">Search result for &quot;{search}&quot; in Department Budgets</div>

      <div className="SearchResult-group">
        {count ? buildRatio(count) : null}

        <div className="SearchResult-list">
          {results ? buildResults(results) : buildResults(null, true)}
        </div>
      </div>
    </div>
  );
}