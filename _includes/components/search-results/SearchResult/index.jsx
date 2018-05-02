import { h } from 'preact';
import Form from './partials/Form.jsx';


export default function SearchResultMarkup(props) {
  const {
    results,
    shown,
    page,
    province,
    error,
    loading,
    otherYears,

    search,
    selectedYear,

    updateFilter,
    changeShown,
    updateItem,
  } = props;


  if (error) {
    return (
      <div className="SearchResult-wrap">
        <span>Something went wrong with the search. Please try again at a later point.</span>
      </div>
    );
  }

  const preDepartments = results.filter((item) => {
    const provSlugIndex = item.extras.findIndex(
      (data) => {
        return data.key === 'geographic_region_slug';
      },
    );

    const provSlug = item.extras[provSlugIndex].value;

    return province === 'all' || province === provSlug;
  });

  const departments = preDepartments.map((item) => {
    const provSlugIndex = item.extras.findIndex(
      (data) => {
        return data.key === 'geographic_region_slug';
      },
    );

    const provSlug = item.extras[provSlugIndex].value;

    const nameSlugIndex = item.extras.findIndex(
      (data) => {
        return data.key === 'department_name_slug';
      },
    );

    const nameSlug = item.extras[nameSlugIndex].value;
    const departmentType = item.province.length > 0 ? item.province : 'National';

    const url = item.province.length > 0 ? `/${selectedYear}/provincial/${provSlug}/departments/${nameSlug}` : `/${selectedYear}/national/departments/${nameSlug}`;

    return (
      <a href={url} className="SearchResult-link">
        {departmentType} Department: {item.extras[0].value}
      </a>
    );
  });

  const pages = Math.ceil(departments.length / 10);

  const extra = preDepartments.length > 0 ?
    (
      <span className="SearchResult-countWrap">
        <span>Page {page} of {pages}</span>
      </span>
    ) :
    null;

  const buildOtherYears = () => {
    return (
      <div className="Section is-bevel is-green">
        <div className="OtherYears">
          <div className="OtherYears-item u-paddingTop10">
            <div className="Section-title u-marginRight10 u-colorWhite">See results in other years</div>
          </div>
          {
            otherYears.map(({ count, name }) => {
              const escapedSearch = encodeURI(search);
              return (
                <a
                  className="Button is-secondary is-inline"
                  href={`/${name}/search-result?search_type=full-search&search_string=${escapedSearch}&search=${escapedSearch} `}
                >
                  <span>{name}</span>
                  <span className="u-fontWeightNormal">&nbsp;({count})</span>
                </a>
              );
            })
          });
        </div>
      </div>
    );
  };

  const state = {
    results,
    shown,
    page,
    province,
    error,
    loading,
    otherYears,
  };

  return (
    <div className="SearchResult-wrap">
      <div className="SearchResult-heading">Search result for &quot;{search}&quot; in Department Budgets</div>

      <div className="SearchResult-formWrap">
        <Form {...{ state, updateFilter }} />
      </div>

      <div className="SearchResult-group">
        <div className="SearchResult-title">Suggested Department Budgets{ departments ? extra : ''}</div>
        <div className="SearchResult-list">
          {loading ? <div>Loading...</div> : null}
          {!loading && preDepartments.length > 0 ? departments.splice((page * 10) - 10, 10) : null}
          {!loading && preDepartments.length < 1 ?
            <div className="SearchResult-error">
              <span>We didn&#8217;t find anything for &#8217;{ search }&#8217;. </span>
              <a href={`/${selectedYear}/departments`}>View a list of all departments</a>
            </div> :
            null
          }
        </div>
      </div>

      <div className="SearchResult-pageWrap">
        {page <= 1 ? null : <button onClick={() => updateItem('page', page - 1)} className="SearchResult-prev">Previous Page</button>}
        {page >= pages ? null : <button onClick={() => updateItem('page', page + 1)} className="SearchResult-next">Next Page</button>}
      </div>

      <div>
        {otherYears ? buildOtherYears(otherYears) : null}
      </div>
    </div>
  );
}

