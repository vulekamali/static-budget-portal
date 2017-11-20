import { h } from 'preact';


export default function Results({ results, province }) {
  const content = results.map((group) => {
    if (group.departments.length > 0) {
      return (
        <div className="DeptSearch-group">
          <div className="DeptSearch-title">{group.name}</div>
          {
            group.departments.map((link) => {
              return <a className="DeptSearch-link" href="#">{link.name}</a>;
            })
          }
        </div>
      );
    }

    return (
      <div className="DeptSearch-group DeptSearch-group--blank">
        <div className="DeptSearch-title">{group.name}</div>
        <div className="DeptSearch-link">No Results Found</div>
      </div>
    );
  });

  return (
    <div className="DeptSearch-results">
      {content}
    </div>
  );
}
