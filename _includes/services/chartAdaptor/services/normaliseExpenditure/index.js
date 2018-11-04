const determineType = (value) => {
  switch (value) {
    case 'Audited Outcome': return 'AO';
    case 'Adjusted appropriation': return 'AA';
    case 'Main appropriation': return 'MA';
    case 'Medium Term Estimates': return 'MTE';
    default: return '';
  }
};


const normaliseExpenditure = (data) => {
  const {
    nominal: nominalRaw,
    real: realRaw,
  } = data;

  const createObject = (result, { financial_year: year, amount: value, phase }) => ({
    ...result,
    [`${year} (${determineType(phase)})`]: value,
  });

  const nominal = nominalRaw.reduce(createObject, {});
  const real = realRaw.reduce(createObject, {});
  return { nominal, real };
};


export default normaliseExpenditure;
