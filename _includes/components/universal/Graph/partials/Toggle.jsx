import { h } from 'preact';
import GraphContainer from './GraphContainer.jsx';


export default function Toggle({ items, year, legend }) {

  const hasNull = Object.keys(items).reduce(
    (result, key) => {
      const array = items[key];

      if (array[0] === null) {
        return true;
      }

      return result;
    },
    false,
  );

  if (hasNull) {
    return (
      <div>
        <ul>
          {Object.keys(items).map(name => <li>{name}</li>)}
        </ul>
      </div>
    );
  }

  return <GraphContainer {...{ items, year, legend }} />;
}
