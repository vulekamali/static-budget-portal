import { h } from 'preact';
import Tooltip from './../../Tooltip/index.jsx';


export default function YearSelectMarkup({ jsonData, tooltip, open, updateItem, search, loading }) {
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
            open={data.name === tooltip}
            block
            important
            direction="down"
            title="Content Unavailable"
            description={`There is no exact match for this department in ${data.name}.`}
            actions={[{ text: `View ${data.name} Departments`, link: `/${data.name}/departments` }]}
            openAction={() => updateItem('tooltip', data.name)}
            closeAction={() => updateItem('tooltip', null)}

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
        <h2 className="YearSelect-title">Show data for a financial year</h2>
        <div className="YearSelect-content">
          { loading ? placeholder : realData }
        </div>
      </div>
    </div>
  );
}
