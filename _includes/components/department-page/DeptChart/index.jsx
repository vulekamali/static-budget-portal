import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';


export default function HomeChart({ values }) {
  const hasNull = values.reduce(
    (result, val) => {
      if (!val.total_budget) {
        return true;
      }

      return result;
    },
    false,
  );

  if (hasNull) {
    return (
      <div className="DeptChart">
        <ul>
          {values.map(val => <li>{val.name}</li>)}
        </ul>
      </div>
    );
  }

  const items = values.reduce(
    (results, val) => {
      return {
        ...results,
        [val.name]: [val.total_budget],
      };
    },
    {},
  );

  return (
    <div className="DeptChart">
      <ResponsiveChart
        max={600}
        offset={20}
        {...{ items }}
      />
    </div>
  );
}
