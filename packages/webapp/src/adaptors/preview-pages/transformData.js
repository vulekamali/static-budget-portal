const transformData = (response, department) => {
  console.log(response);

  const result = response.find(({ slug }) => slug === department)

  console.log(result)
};


export default transformData;
