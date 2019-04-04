const createProgrammeObject = ({ amount, title }) => ({
  amount,
  title
});

const transformData = (response, departmentId) => {

  const department = response.items.filter(({ slug }) => slug === departmentId);

  const [departmentSchema] = department.map(department => {
    const {
      percentage_of_budget: percentage,
      total,
      programmes,
      description
    } = department;

    return {
      resources: {
        consolidated: percentage,
        value: total
      },
      items: programmes.map(createProgrammeObject),
      description,
    }
  })

 return departmentSchema;

};

export default transformData;
