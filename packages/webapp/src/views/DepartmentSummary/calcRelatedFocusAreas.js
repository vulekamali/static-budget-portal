const calcRelatedFocusAreas = ({ departments, selectedDepartment }) => {
  if (departments.length <= 0) {
    return [];
  }

  const { focus_areas: focusAreas } = departments.find(({ title }) => title === selectedDepartment);
  return focusAreas;
};

export default calcRelatedFocusAreas;
