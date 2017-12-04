import { h } from 'preact';
import PropTypes from 'prop-types';


export default function List(props) {
  const {
    count,
    currentKeywords,
    error,
    itemsArray,
    searching,
    selectedYear,
  } = props;


  // ...
  const buildGaQuery = () => {
    return `?search_type=suggestion-click&search_string=${selectedYear}%3A%20${currentKeywords}`;
  };


  // ...
  const generateDeptName = (item) => {
    const isNational = item.province.length > 0;
    return isNational ? item.province : 'National';
  };


  // ...
  const generateUrl = (item) => {
    const strings = ['geographic_region_slug', 'department_name_slug'];

    const provSlugIndex = item.extras.findIndex(data => data.key === strings[0]);
    const nameSlugIndex = item.extras.findIndex(data => data.key === strings[1]);

    const provSlug = item.extras[provSlugIndex].value;
    const nameSlug = item.extras[nameSlugIndex].value;

    const isNational = item.province.length > 0;

    const baseUrl = isNational ?
      `/${selectedYear}/provincial/${provSlug}/departments/${nameSlug}` :
      `/${selectedYear}/national/departments/${nameSlug}`;

    return baseUrl + buildGaQuery(selectedYear, currentKeywords);
  };


  // ...
  const searchingMarkup = (
    <div className="Search-list">
      <div className="Search-loading">
        Searching...
      </div>
    </div>
  );


  // ...
  const errorMarkup = (
    <div className="Search-list">
      <div className="Search-error">
        <span>Something went wrong with the search. Please try again at a later point.</span>
      </div>
    </div>
  );


  // ...
  const emptyMarkup = (
    <div className="Search-list">
      <div className="Search-error">
        <span>We didn&#8217;t find anything for &#8217;{ currentKeywords }&#8217;. </span>
        <a href={`/${selectedYear}/departments${buildGaQuery(selectedYear, currentKeywords)}`}>
          View a list of all departments
        </a>
      </div>
    </div>
  );


  // ...
  // TO DO do not hardcode [0]
  const itemMarkup = () => {
    const result = itemsArray.map((item) => {
      return (
        <li>
          <a href={generateUrl(item)} className="Search-link">
            {generateDeptName(item)} Department: {item.extras[0].value}
          </a>
        </li>
      );
    });

    return (
      <ul className="Search-list">
        {result}
      </ul>
    );
  };


  // ...
  const buildList = () => {
    if (searching) {
      return searchingMarkup;
    }

    if (error) {
      return errorMarkup;
    }

    if (itemsArray.length < 1) {
      return emptyMarkup;
    }

    return itemMarkup();
  };


  // ...
  const formatCount = (fnCount) => {
    if (!fnCount) {
      return null;
    }

    return ` (Showing ${fnCount < 10 ? fnCount : 10} of ${fnCount})`;
  };


  return (
    <div>
      <span className="Search-title">
        <span>Suggested Departments</span>
        <span className="Search-showing">
          {formatCount(count)}
        </span>
      </span>
      { buildList() }
    </div>
  );
}


List.propTypes = {
  count: PropTypes.string.isRequired,
  currentKeywords: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  itemsArray: PropTypes.array.isRequired,
  searching: PropTypes.bool.isRequired,
  selectedYear: PropTypes.string.isRequired,
};
