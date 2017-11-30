import { h } from 'preact';
import Form from './Form.jsx';


export default function SearchResultMarkup({ loading, error, state, updateItem, page, province, results, search, selectedYear, updateFilter }) {
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

  return (
    <div className="SearchResult-wrap">
      <div className="SearchResult-heading">Search result for &quot;{search}&quot; in Departments</div>

      <div className="SearchResult-formWrap">
        <Form {...{ state, updateFilter }} />
      </div>

      <div className="SearchResult-group">
        <div className="SearchResult-title">Suggested Departments{ departments ? extra : ''}</div>
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
    </div>
  );
}

