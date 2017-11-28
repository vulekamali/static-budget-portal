import { h } from 'preact';
import Form from './Form.jsx';


export default function SearchResultMarkup({ count, changeShown, state, search, selectedYear, updateFilter, shown }) {
  const { results } = state;
  const departments = results.map((item) => {
    const provSlugIndex = item.extras.findIndex(
      (data) => {
        return data.key === 'geographic_region_slug';
      },
    );

    const nameSlugIndex = item.extras.findIndex(
      (data) => {
        return data.key === 'department_name_slug';
      },
    );

    const provSlug = item.extras[provSlugIndex].value;
    const nameSlug = item.extras[nameSlugIndex].value;
    const departmentType = item.province.length > 0 ? item.province : 'National';
    const url = item.province.length > 0 ? `/${selectedYear}/provincial/${provSlug}/departments/${nameSlug}` : `/${selectedYear}/national/departments/${nameSlug}`;

    if (
      state.province === 'all' ||
      state.province === provSlug
    ) {
      return (
        <a href={url} className="SearchResult-link">
          {departmentType} Department: {item.extras[0].value}
        </a>
      );
    }

    return null;
  });

  const newShown = count < 4 ? count : shown;

  const extra = (
    <span className="SearchResult-countWrap">
      <span>Showing </span>
      <input
        className="SearchResult-count"
        type="number"
        max={count}
        value={newShown}
        onInput={event => changeShown(event.target.value)}
      />
      <span> of {count}</span>
    </span>
  );

  return (
    <div className="SearchResult-wrap">
      <div className="SearchResult-heading">Search result for &quot;{search}&quot; in Departments</div>

      <div className="SearchResult-formWrap">
        <Form {...{ state, updateFilter }} />
      </div>

      <div className="SearchResult-group">
        <div className="SearchResult-title">Suggested Departments{ count ? extra : ''}</div>
        <div className="SearchResult-list">
          {departments}
        </div>
      </div>
    </div>
  );
}

