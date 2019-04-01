import React from 'react';

import {
  StyledCircle,
  StyledSvg,
} from './styled';

const Slice = ({dimensions, start, amount}) => {
  const circumference = Math.round(Math.PI * (dimensions / 2));

  return (
    <StyledCircle
      r={dimensions / 4}
      cy={dimensions / 2}
      cx={dimensions / 2}
      strokeWidth={dimensions / 2 - 1}
      fill="none"
      strokeDasharray={`${((amount / 100) * circumference)}, ${circumference}`}
      strokeDashoffset={-(start / 100) * circumference}
    />
  );
};

const PieChart = ({ dimensions, values }) => {

  const startRanges = values.reduce(
    (result, val, i) => {
      return [
        ...result,
        val + result[i],
      ]
    },
    [0]
  );

  const slices = values.map((value, i) => {
    return <Slice {...{ dimensions }} start={startRanges[i]} amount={value} key={i} />
  });

  return (
    <StyledSvg
      width={dimensions}
      height={dimensions}
      viewBox={`0 0 ${dimensions} ${dimensions}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      {slices}
    </StyledSvg>
  )

};

export default PieChart;
