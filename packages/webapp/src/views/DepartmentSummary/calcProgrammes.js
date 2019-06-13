import calcFineprint from './calcFineprint';

const calcProgrammes = props => {
  const { departmentsIsLoading, selectedYear, selectedDepartment, departments } = props;

  if (departments.length <= 0) {
    return {
      chartLoading: true,
      chartData: [],
      chartTotalAmount: null,
      chartFooterData: [],
      chartNoticeData: [],
    };
  }

  const { total, programmes = [] } =
    departments.find(({ title }) => title === selectedDepartment) || {};

  const transformItem = ({ amount, percentage: ratio, title }) => ({
    title,
    amount,
    ratio,
  });

  return {
    chartLoading: !!departmentsIsLoading,
    chartData: programmes.map(transformItem),
    chartTotalAmount: total,
    chartFooterData: calcFineprint(selectedYear),
    chartNoticeData: [],
  };
};

export default calcProgrammes;
