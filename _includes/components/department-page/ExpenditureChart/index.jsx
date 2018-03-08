import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';


export default function ExpenditureChart({ values }) {

  const notAdjusted = values.nominal.reduce(
    (result, val) => {
      if (val.amount) {
        return {
          ...result,
          [val.financial_year]: [val.amount],
        };
      }

      return result;
    },
    {},
  );

  const adjusted = values.real.reduce(
    (result, val) => {
      if (val.amount) {
        return {
          ...result,
          [val.financial_year]: [val.amount],
        };
      }

      return result;
    },
    {},
  );

  const charts = {
    'Adjusted for inflation': adjusted,
    'Not adjusted for inflation': notAdjusted,
  };

  return (
    <div className="ProgrammeChart">
      <ResponsiveChart
        max={650}
        offset={120}
        {...{ charts }}
        downloadable
        columns="500"
        name="expenditure-chart"
      />
    </div>
  );
}
