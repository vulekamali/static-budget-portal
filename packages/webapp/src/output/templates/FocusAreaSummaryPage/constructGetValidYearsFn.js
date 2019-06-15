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
  selectedFocusArea,
}) => response => {
  const result = response.map(({ data }) => {
    const items = get(data, 'data.items');
    const isArray = !!items && items.length > 0;
    return isArray && !!items.find(({ title }) => title === selectedFocusArea);
  });

  setValidYears(result);
  setValidYearsLoading(false);
};

const constructGetValidYearsFn = ({
  setValidYears,
  setValidYearsLoading,
  setError,
  latestYear,
}) => ({ selectedFocusArea }) => {
  try {
    setValidYearsLoading(true);
    const yearsToCheck = calcValidYearsRange(latestYear);
    const urlsToCheck = yearsToCheck.map(financialYear => `/json/${financialYear}/focus.json`);
    const pendingRequestsArray = urlsToCheck.map(axios.get);

    Promise.all(pendingRequestsArray)
      .then(completeRequest({ setValidYears, setValidYearsLoading, selectedFocusArea }))
      .catch();
  } catch (error) {
    setError(logError(setError));
  }
};

export default constructGetValidYearsFn;
