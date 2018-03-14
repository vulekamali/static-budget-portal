import { h } from 'preact';
import Tooltip from './../../universal/Tooltip/index.jsx';


export default function YearSelectMarkup({ jsonData, tooltip, open, updateItem, search, loading, year }) {
  const items = jsonData.map((data) => {
    const Tag = data.active || data.direct === false ? 'span' : 'a';
    const toggleOpen = () => updateItem('open', !open);
    const linkWithQuery = search ? `${data.url}?search=${search}` : data.url;

    if (!data.direct) {
      return (
        <li
          className={`YearSelect-item${ data.active ? ' is-active' : '' }`}
          onClick={ data.active ? toggleOpen : null }
        >
          <Tooltip
            block
            title="Content Unavailable"
            description={`There is no exact match for this department in ${data.name}.`}
            year={year}
            openAction={() => updateItem('tooltip', data.name)}
            closeAction={() => updateItem('tooltip', null)}
            open={data.name === tooltip}
            down
            actions={[
              {
                url: `/${data.name}/departments`,
                title: `View ${data.name} Departments`,
              },
            ]}
          >
            <Tag href={data.active || data.direct === false ? null : linkWithQuery} className="YearSelect-link">{data.name}</Tag>
          </Tooltip>
        </li>
      );
    }

    return (
      <li
        className={`YearSelect-item${ data.active ? ' is-active' : '' }`}
        onClick={ data.active ? toggleOpen : null }
        >
        <Tag href={data.active || data.direct === false ? null : linkWithQuery} className="YearSelect-link">{data.name}</Tag>
      </li>
    );
  });

  const placeholder = (
    <div className={`YearSelect-bar is-loading${open ? ' is-open' : ''}`} />
  );

  const realData = (
    <ul className={`YearSelect-bar${open ? ' is-open' : ''}`}>
      {items}
    </ul>
  );

  return (
    <div className="YearSelect">
      <div className="YearSelect-wrap">
        <h2 className="YearSelect-title">
          <span className="YearSelect-titleExtra">Show data for a </span>
          <span >financial year</span>
        </h2>
        <div className="YearSelect-content">
          { loading ? placeholder : realData }
        </div>
      </div>
    </div>
  );
}
