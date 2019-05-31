import { useState, useEffect } from 'react';
import createFetchDataFn from './createFetchDataFn';
import calcValidYearsRange from './calcValidYearsRange';

const createEndpointUrl = year => `/json/${year}/focus.json`;

const createSetDataAsYearsArrayFn = (validYears, focusArea, setData) => data => {
  const createYearObject = (year, index) => ({
    value: year,
    disabled:
      !data ||
      !data[index] ||
      !data[index].data ||
      !data[index].data.items.find(({ title }) => title === focusArea),
  });

  const validYearsArray = validYears.map(createYearObject);
  setData(validYearsArray);
};

const useUpdateYearsData = (initialUrl, initialFocusArea) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [focusArea, setFocusArea] = useState(initialFocusArea);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const validYears = calcValidYearsRange(url);

  const fetchData = createFetchDataFn(
    setIsError,
    setIsLoading,
    createSetDataAsYearsArrayFn(validYears, focusArea, setData),
  );

  useEffect(() => {
    const validYearUrls = validYears.map(createEndpointUrl);
    fetchData(validYearUrls);
  }, [url, focusArea]);

  return [{ data, isLoading, isError }, { setUrl, setFocusArea }];
};

export default useUpdateYearsData;
