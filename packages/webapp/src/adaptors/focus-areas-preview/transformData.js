const createChildren = ({ amount, name, province, slug, percentage_of_total }) => ({
  amount,
  name,
  province,
  id: slug,
  percentage: percentage_of_total
});

const createProvinces = details => {
  const { province, name, slug, percentage_of_total, amount, url } = details;
  return {
    [province]: {
      name,
      amount,
      id: slug,
      url,
      percentage: percentage_of_total,
      children: createChildren(details)
    }
  }
};

// const createProvincialObjects = ({ notices, footnotes, data }) => ({
//   notices,
//   footnotes,
//   provinces: data.map(createProvinces)
// });

const createNationalDepartments = ({ title, slug, amount }) => ({
  name: title,
  amount,
  url: slug
});

// const createNationalObjects = ({ notices, footnotes, data }) => ({
//   notices,
//   footnotes,
//   departments: data.map(createNationalDepartments)
// });

const transformData = (response) => {
  console.log(response)
  const focusSchema = response.items.map(department => {
    const {
      total,
      national,
      title,
      slug,
      provincial
    } = department;

    const { notices: nationalNotices, footnotes: nationalFootnotes, data: nationalData } = national;
    const { notices: provincialNotices, footnotes: provincialFootnotes, data: provincialData } = provincial;

    return {
      name: title,
      id: slug,
      national: {
        notices: nationalNotices,
        footnotes: nationalFootnotes,
        departments: nationalData.map(createNationalDepartments) 
      },
      total,
      provincial: {
        notices: provincialNotices,
        footnotes: provincialFootnotes,
        provinces: provincialData.map(createProvinces)
      }
    }
  })

  console.log(focusSchema)

 return focusSchema;

};

export default transformData;



// notices: nationalNotices,
//         footnotes: nationalFootnotes,
//         departments: nationalData.map(createNationalDepartments) 