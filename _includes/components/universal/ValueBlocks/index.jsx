import { h } from 'preact';
import trimValues from './../../../utilities/js/helpers/trimValues.js';


export default function RevenueMarkup({ items }) {
  const keys = Object.keys(items);

  return (
    <div className="ValueBlocks">
      {
        keys.map((key) => {
          const link = items[key].link;
          const value = items[key].value;
          const Tag = link ? 'a' : 'div';

          return (
            <div className="Revenue-itemWrap">
              <Tag href={link} className={`Revenue-item${link ? ' Revenue-item--link' : ''}`}>
                <div className="Revenue-title">{key}</div>
                { value ? <div className="Revenue-value">R{trimValues(value)}</div> : null }
              </Tag>
            </div>
          );
        })
      }
    </div>
  );
}
