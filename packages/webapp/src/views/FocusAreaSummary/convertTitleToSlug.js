const convertTitleToSlug = ({ selectedFocusArea, focusAreas }) => {
  const { slug } = focusAreas.find(({ title }) => title === selectedFocusArea);
  return slug;
};

export default convertTitleToSlug;
