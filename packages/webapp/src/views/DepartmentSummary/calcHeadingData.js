import calcValidYearsRange from './calcValidYearsRange';
import calcPrettyName from './calcPrettyName';

const calcButton = ({ selectedDepartment, departments }) => {
  if (departments.length <= 0) {
    return { url: null };
  }

  const { slug } = departments.find(({ title }) => title === selectedDepartment);
  return { url: slug };
};

const calcHeadingData = props => {
  const {
    values: {
      validYears = [],
      departments = [],
      selectedYear,
      selectedDepartment,
      latestYear,
      government,
    },
    status: { departmentsIsLoading, validYearsIsLoading },
    actions: { changeSelectedDepartment, changeSelectedYear },
  } = props;

  const selectionOptions = departments.map(({ title: value }) => ({ value }));

  const yearsRange = calcValidYearsRange(latestYear);

  const validYearsOptions = validYears.map((isValid, index) => ({
    value: yearsRange[index],
    disabled: !isValid,
  }));

  return {
    title: calcPrettyName(government),
    button: calcButton({ selectedDepartment, departments }),
    selectionDropdown: {
      initialSelected: selectedDepartment,
      loading: departmentsIsLoading,
      onSelectedChange: changeSelectedDepartment,
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
