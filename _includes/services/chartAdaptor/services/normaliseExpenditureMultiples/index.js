const convertPhaseIntoNumber = (phaseString) => {
  switch (phaseString) {
    case 'Main Appropriation': return 1;
    case 'Adjusted Appropriation': return 2;
    case 'Final Appropriation': return 3;
    case 'Audited Appropriation': return 4;
    default: return null;
  }
};


const convertYearIntoNumber = (yearString) => {
  return parseInt(yearString.match(/^\d+/), 10);
};


const forcePhaseOrder = (itemsArray) => {
  return itemsArray.sort(
    (a, b) => convertPhaseIntoNumber(a.phase) - convertPhaseIntoNumber(b.phase),
  );
};


const forceYearOrder = (itemsArray) => {
  return itemsArray.sort(
    (a, b) => convertYearIntoNumber(a.financial_year) - convertYearIntoNumber(b.financial_year),
  );
};


const forceOrder = (itemsArray) => {
  const orderedbyYears = forceYearOrder(itemsArray);
  return forcePhaseOrder(orderedbyYears);
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


const normaliseExpenditureMultiples = (rawData) => {
  const data = forceOrder(rawData).reduce(addToYear, {});
  return { data };
};


export default normaliseExpenditureMultiples;
