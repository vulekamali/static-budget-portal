import { h } from 'preact';


import Map from './partials/Map.jsx';

export default function DeptGroup({ map, linksArray, name: title, doubleRow, empty }) {

  if (empty) {
    return (
      <div className="DeptGroup">
        <div className="DeptGroup-wrap">
          <h3 className="DeptGroup-title">{title} Department Budgets</h3>
          <p className="u-fontStyle u-fontStyle--italic">This data is not yet available. Provincial budgets are only available a few weeks after the national budget has been announced. This is because the national budget determines the amount of money each province receives.</p>
        </div>
        <div className="DeptGroup-map">
          {Map(map)}
        </div>
      </div>
    );
  }

  return (
    <div className="DeptGroup">
      <div className="DeptGroup-wrap">
        <h3 className="DeptGroup-title">{title} Department Budgets</h3>
        <ul className={`DeptGroup-list${doubleRow ? ' DeptGroup-list--doubleRow' : ''}`}>
          {
            linksArray.map(({ name, url_path: url }) => {
              return (
                <li className="DeptGroup-item">
                  <a className="DeptGroup-link" href={url}>
                    {name}
                  </a>
                </li>
              );
            })
          }
        </ul>
      </div>
      <div className="DeptGroup-map">
        {Map(map)}
      </div>
    </div>
  );
}
