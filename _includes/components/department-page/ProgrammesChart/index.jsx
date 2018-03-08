import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';


export default function ProgrammesChart({ values }) {
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
      <div className="ProgrammeChart">
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

  const charts = { 'Programmes List': items };

  return (
    <div className="ProgrammeChart">
      <ResponsiveChart
        max={600}
        offset={20}
        {...{ charts }}
        downloadable
      />
    </div>
  );
}
