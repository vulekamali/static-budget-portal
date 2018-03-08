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
        max={600}
        offset={20}
        {...{ charts }}
        downloadable
        columns="500"
      />
    </div>
  );
}

/*


{
  "nominal": [
    {
      "financial_year": "2014-15",
      "amount": 177500000
    },
    {
      "financial_year": "2015-16",
      "amount": 188400000
    },
    {
      "financial_year": "2016-17",
      "amount": 194700000
    },
    {
      "financial_year": "2017-18",
      "amount": 206200000
    },
    {
      "financial_year": "2018-19",
      "amount": 230200000
    }
  ],
  "real": [
    {
      "financial_year": "2014-15",
      "amount": 199550000
    },
    {
      "financial_year": "2015-16",
      "amount": 202940000
    },
    {
      "financial_year": "2016-17",
      "amount": 205580000
    },
    {
      "financial_year": "2017-18",
      "amount": 206200000
    },
    {
      "financial_year": "2018-19",
      "amount": 208260000
    }
  ],
  "base_calendar_year": 2017
}

*/