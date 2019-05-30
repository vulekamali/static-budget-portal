import { useState, useEffect } from 'react';
import createFetchDataFn from './createFetchDataFn';
import calcValidYearsRange from './calcValidYearsRange';

const createEndpointUrl = year => `/json/${year}/focus.json`;

const createSetDataAsYearsArrayFn = (validYears, setData) => data => {
  const createYearObject = (year, index) => ({
    year,
    valid: !!data[index] && Object.keys(data[index]).length > 0,
  });

  const validYearsArray = validYears.map(createYearObject);
  setData(validYearsArray);
};

const useUpdateYearsData = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData || null);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const validYears = calcValidYearsRange(url);

  const fetchData = createFetchDataFn(
    setIsError,
    setIsLoading,
    createSetDataAsYearsArrayFn(validYears, setData),
  );

  useEffect(() => {
    const validYearUrls = validYears.map(createEndpointUrl);
    fetchData(validYearUrls);
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useUpdateYearsData;
