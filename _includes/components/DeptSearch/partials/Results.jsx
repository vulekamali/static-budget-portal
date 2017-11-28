import { h } from 'preact';


export default function Results({ state }) {
  const { results, province, spheres } = state;

  const content = results.map((group, i) => {
    if (
      (spheres === 'all' || spheres === 'national' || province === 'all' || province === group.slug) &&
      !(i === 0 && spheres === 'provincial') &&
      !(i > 0 && spheres === 'national')
    ) {
      if (group.departments.length > 0) {
        return (
          <li className="DeptSearch-group">
            <h4 className="DeptSearch-title">{group.name} Departments</h4>
            <ul className="DeptSearch-results">
              {
                group.departments.map((link) => {
                  return (
                    <li>
                      <a className="DeptSearch-link" href={link.url_path}>{link.name}</a>
                    </li>
                  );
                })
              }
            </ul>
          </li>
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
