import axios from 'axios';

const logError = setError => error => {
  setError(true);
  console.error(error); // eslint-disable-line no-console
};

const completeRequest = ({ setFocusAreas, setFocusAreasLoading, setError }) => response => {
  try {
    const {
      data: {
        data: { items },
      },
    } = response;

    setFocusAreas(items);
    setFocusAreasLoading(false);
  } catch (error) {
    setError(error);
  }
};

const constructGetFocusAreaData = ({ setFocusAreas, setFocusAreasLoading, setError }) => ({
  selectedYear,
}) => {
  setFocusAreasLoading(true);
  setFocusAreas([]);

  axios
    .get(`/json/${selectedYear}/focus.json`)
    .then(completeRequest({ setFocusAreas, setFocusAreasLoading, setError }))
    .catch(logError(setError));
};

export default constructGetFocusAreaData;
