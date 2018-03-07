import { h } from 'preact';
import ResponsiveChart from './../../universal/ResponsiveChart/index.jsx';
import ValueBlocks from './../../universal/ValueBlocks/index.jsx';


export default function HomeChart({ values, year }) {

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
    const items = values.reduce(
      (results, val) => {
        return {
          ...results,
          [val.name]: {
            link: encodeURI(`${year}/search-result?search_type=full-search&search=${val.name}`),
          },
        };
      },
      {},
    );

    return (
      <ValueBlocks
        {...{ items }}
      />
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
    <ResponsiveChart
      max={600}
      offset={20}
      {...{ items }}
    />
  );
}
