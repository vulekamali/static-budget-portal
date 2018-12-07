const addToYear = (result, { financial_year: year, amount }) => {
  return {
    ...result,
    [year]: [
      ...(result[year] || []),
      amount,
    ],
  };
};


const normaliseExpenditure = (data) => {
  const { nominal, real } = data;

  return {
    nominal: nominal.reduce(addToYear, {}),
    real: real.reduce(addToYear, {}),
  };
};


export default normaliseExpenditure;
