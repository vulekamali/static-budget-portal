import { get } from 'lodash';
import axios from 'axios';
import calcValidYearsRange from './calcValidYearsRange';

const logError = setError => error => {
  setError(true);
  console.error(error); // eslint-disable-line no-console
};

const completeRequest = ({
  setValidYears,
  setValidYearsLoading,
  selectedDepartment,
}) => response => {
  const result = response.map(({ data }) => {
    const items = get(data, 'data.items');
    const isArray = !!items && items.length > 0;
    return isArray && !!items.find(({ title }) => title === selectedDepartment);
  });

  setValidYears(result);
  setValidYearsLoading(false);
};

const constructGetValidYearsFn = ({
  setValidYears,
  setValidYearsLoading,
  setError,
  latestYear,
  sphere,
  government,
}) => ({ selectedDepartment }) => {
  try {
    setValidYearsLoading(true);
    const yearsToCheck = calcValidYearsRange(latestYear);
    const urlsToCheck = yearsToCheck.map(
      financialYear => `/json/${financialYear}/previews/${sphere}/${government}/original.json`,
    );
    const pendingRequestsArray = urlsToCheck.map(axios.get);

    Promise.all(pendingRequestsArray)
      .then(completeRequest({ setValidYears, setValidYearsLoading, selectedDepartment }))
      .catch();
  } catch (error) {
    setError(logError(setError));
  }
};

export default constructGetValidYearsFn;
