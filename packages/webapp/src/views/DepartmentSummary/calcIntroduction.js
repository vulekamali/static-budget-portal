const calcIntroduction = ({ departments, selectedDepartment, sphere }) => {
  if (departments.length <= 0) {
    return null;
  }

  const { description, total, percentage_of_budget: percentage } = departments.find(
    ({ title }) => title === selectedDepartment,
  );

  return { total, description, percentage, sphere };
};

export default calcIntroduction;
