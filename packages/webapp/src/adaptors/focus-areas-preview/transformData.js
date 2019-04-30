import addProvinceToObject from './addProvinceToObject';

const createNationalDepartments = ({ title, slug, amount }) => ({
  name: title,
  amount,
  url: slug
});


const transformData = (response) => {
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
        provinces: addProvinceToObject(provincialData)
      }
    }
  })

 return focusSchema;

};

export default transformData;
