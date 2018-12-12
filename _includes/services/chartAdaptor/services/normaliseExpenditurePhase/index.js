const convertPhaseIntoValue = (phaseString) => {
  switch (phaseString) {
    case 'Main Appropriation': return 1;
    case 'Adjusted Appropriation': return 2;
    case 'Final Appropriation': return 3;
    case 'Audited Appropriation': return 4;
    default: return null;
  }
};


const forceCorrectOrder = (itemsArray) => {
  return itemsArray.sort((a, b) => convertPhaseIntoValue(a) - convertPhaseIntoValue(b));
};


const addToYear = (result, { financial_year: year, amount }) => {
  return {
    ...result,
    [year]: [
      ...(result[year] || []),
      amount,
    ],
  };
};


const normaliseExpenditurePhase = (data) => {
  const { nominal: nominalRaw, real: realRaw } = data;

  const nominal = forceCorrectOrder(nominalRaw).reduce(addToYear, {});
  const real = forceCorrectOrder(realRaw).reduce(addToYear, {});

  return {
    nominal,
    real,
  };
};


export default normaliseExpenditurePhase;
