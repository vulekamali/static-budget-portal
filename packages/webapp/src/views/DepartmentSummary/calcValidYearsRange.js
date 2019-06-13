const calcNextYear = year => year + 1;

const convertToFinancialYearRange = year => {
  return `${year}-${calcNextYear(year)
    .toString()
    .substr(-2)}`;
};

const createYearRange = latestYear => (value, index) => {
  const year = parseInt(latestYear, 10) - index;
  return convertToFinancialYearRange(year);
};

const calcValidYearsRange = latestYear => new Array(4).fill(true).map(createYearRange(latestYear));

export default calcValidYearsRange;
