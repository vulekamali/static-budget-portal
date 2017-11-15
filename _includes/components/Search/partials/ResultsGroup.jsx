import { h } from 'preact';
import Loading from './Loading.jsx';


export default function ResultsGroups({ results, loading }) {
  const buildList = () => {
    if (results.length < 1) {
      return <div>No results found</div>;
    }

    return (
      <ul className="Search-list">
        {
          results.map((item) => {
            return <li>{item.province[0]} Department: {item.extras[0].value}</li>;
          })
        }
      </ul>
    );
  };

  return (
    <div>
      <span className="Search-title">Suggested Departments</span>
      {loading ? <Loading /> : buildList() }
    </div>
  );
}
