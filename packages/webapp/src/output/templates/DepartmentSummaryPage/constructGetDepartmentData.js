import axios from 'axios';

const logError = setError => error => {
  setError(true);
  console.error(error); // eslint-disable-line no-console
};

const completeRequest = ({ setDepartments, setDepartmentsLoading, setError }) => response => {
  try {
    const {
      data: {
        data: { items },
      },
    } = response;

    setDepartments(items);
    setDepartmentsLoading(false);
  } catch (error) {
    setError(error);
  }
};

const constructGetDepartmentData = ({
  setDepartments,
  setDepartmentsLoading,
  setError,
  sphere,
  government,
}) => ({ selectedYear }) => {
  setDepartmentsLoading(true);
  setDepartments([]);

  axios
    .get(`/json/${selectedYear}/previews/${sphere}/${government}/original.json`)
    .then(completeRequest({ setDepartments, setDepartmentsLoading, setError }))
    .catch(logError(setError));
};

export default constructGetDepartmentData;
