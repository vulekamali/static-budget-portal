const createProgrammeObject = ({ amount, title }) => ({
  amount,
  title
});

const transformData = (response) => {
  const departmentSchema = response.items.map(department => {
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

  console.log(departmentSchema)

 return departmentSchema;

};

export default transformData;
