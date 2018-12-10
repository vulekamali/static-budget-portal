const addToYear = (result, { financial_year: year, amount }) => {
  return {
    ...result,
    [year]: [
      ...(result[year] || []),
      amount,
    ],
  };
};


const normaliseExpenditureMultiples = (rawData) => {
  const data = rawData.reduce(addToYear, {});
  return { data };
};


export default normaliseExpenditureMultiples;
