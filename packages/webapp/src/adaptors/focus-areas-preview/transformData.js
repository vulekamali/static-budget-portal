const createProgrammeObject = ({ amount, title }) => ({
  amount,
  name: title
});

const transformData = (response) => {
  console.log(response)
  const departmentSchema = response.items.map(department => {
    const {
      percentage_changed: percentage,
      total,
      national,
      description,
      title,
      slug,
      url,
    } = department;

    return {
      resources: {
        consolidated: percentage,
        value: total
      },
      items: national.map(createProgrammeObject),
      description,
      name: title,
      id: slug,
      url,
      total
    }
  })

  console.log(departmentSchema)

 return departmentSchema;

};

export default transformData;
