import queryString from 'query-string';


function loadStringQueries() {
  window.budgetPortal = {
    stringQueries: queryString.parse(location.search) || {},
  };
}


export default loadStringQueries();
