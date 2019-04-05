const createProgrammeObject = ({ amount, title }) => ({
  amount,
  title
});

const transformData = (response, departmentId) => {

  const department = response.items.filter(({ slug }) => slug === departmentId);

  let allDepartmentSlugs = response.items.map(item =>{
     let rObj = {};
     rObj['slug'] = item.slug;
     rObj['title'] = item.title;
     return rObj;
  });

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
      options: allDepartmentSlugs,
      description,
    }
  });

 return departmentSchema;

};

export default transformData;
