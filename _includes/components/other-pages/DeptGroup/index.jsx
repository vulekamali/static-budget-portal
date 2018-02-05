import { h } from 'preact';


import Map from './partials/Map.jsx';

export default function DeptGroup({ map, linksArray, name: title, doubleRow }) {
  return (
    <div className="DeptGroup">
      <div className="DeptGroup-wrap">
        <h3 className="DeptGroup-title">{title}</h3>
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
  )
}
