import { h } from 'preact';
import Loading from './Loading.jsx';


export default function ResultsGroups({ search, initRequest, keywords, error, results, loading, selectedYear, count }) {
  const buildList = () => {
    if (error) {
      return (
        <ul className="Search-list">
          <li className="Search-error">
            <span>Something went wrong with the search. Please try again at a later point.</span>
          </li>
        </ul>
      );
    }

    if (results.length < 1) {
      const analyticsQueries = `?search_type=search-empty-view-all&search_string=${selectedYear}%3A%20${keywords}`;

      return (
        <ul className="Search-list">
          <li className="Search-error">
            <span>We didn&#8217;t find anything for &#8217;{ keywords }&#8217;. </span>
            <a href={`/${selectedYear}/departments${analyticsQueries}`}>View a list of all departments</a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="Search-list">
        {
          results.map((item) => {
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
            const analyticsQueries = `?search_type=suggestion-click&search_string=${selectedYear}%3A%20${keywords}`;

            return (
              <li>
                <a
                  className="Search-link"
                  href={url + analyticsQueries}
                >
                  {departmentType} Department: {item.extras[0].value}
                </a>
              </li>
            );
          })
        }
      </ul>
    );
  };

  const newShown = count < 10 ? count : 10;

  return (
    <div>
      <span className="Search-title">
        <span>Suggested Departments</span>
        <span className="Search-showing">{count ? ` (Showing ${newShown} of ${count})` : ''}</span>
      </span>
      {loading ? <ul className="Search-list"><Loading /></ul> : buildList() }
    </div>
  );
}
