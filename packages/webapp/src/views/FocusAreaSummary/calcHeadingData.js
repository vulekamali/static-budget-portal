import calcValidYearsRange from './calcValidYearsRange';

const calcHeadingData = props => {
  const {
    values: { validYears = [], focusAreas = [], selectedYear, selectedFocusArea, latestYear },
    status: { focusAreasIsLoading, validYearsIsLoading },
    actions: { changeSelectedFocusArea, changeSelectedYear },
  } = props;

  const selectionOptions = focusAreas.map(({ title: value }) => ({ value }));

  const yearsRange = calcValidYearsRange(latestYear);

  const validYearsOptions = validYears.map((isValid, index) => ({
    value: yearsRange[index],
    disabled: !isValid,
  }));

  return {
    selectionDropdown: {
      initialSelected: selectedFocusArea,
      loading: focusAreasIsLoading,
      onSelectedChange: changeSelectedFocusArea,
      options: selectionOptions,
    },
    yearDropdown: {
      initialSelected: selectedYear,
      loading: validYearsIsLoading,
      onSelectedChange: changeSelectedYear,
      options: validYearsOptions,
    },
  };
};

export default calcHeadingData;
