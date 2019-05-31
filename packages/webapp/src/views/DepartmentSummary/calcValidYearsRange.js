const calcNextYear = year => year + 1;

const convertToFinancialYearRange = year => {
  const yearRange = `${year}-${calcNextYear(year)
    .toString()
    .substr(-2)}`;
  return yearRange;
};

const createYearRange = latestYear => (value, index) => {
  const year = parseInt(latestYear, 10) - index;
  return convertToFinancialYearRange(year);
};

const createYearsToCheckArray = latestYear =>
  new Array(4).fill(true).map(createYearRange(latestYear));

export default createYearsToCheckArray;
