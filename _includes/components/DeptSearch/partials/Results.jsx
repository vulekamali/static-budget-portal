import { h } from 'preact';


export default function Results({ state }) {
  const { results, province } = state;
  const content = results.map((group) => {
    if (
      province.value === null ||
      province.value === group.slug
    ) {
      if (group.departments.length > 0) {
        return (
          <div className="DeptSearch-group">
            <div className="DeptSearch-title">{group.name}</div>
            {
              group.departments.map((link) => {
                return <a className="DeptSearch-link" href={link.url_path}>{link.name}</a>;
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
    }

    return null;
  });

  return (
    <div className="DeptSearch-results">
      {content}
    </div>
  );
}
