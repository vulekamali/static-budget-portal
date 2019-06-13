const convertTitleToSlug = ({ selectedDepartment, departments }) => {
  const { slug } = departments.find(({ title }) => title === selectedDepartment);
  return slug;
};

export default convertTitleToSlug;
