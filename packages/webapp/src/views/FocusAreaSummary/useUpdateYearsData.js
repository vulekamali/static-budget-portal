import { useState, useEffect } from 'react';
import createFetchDataFn from './createFetchDataFn';
import calcValidYearsRange from './calcValidYearsRange';

const createEndpointUrl = year => `/json/${year}/focus.json`;

const createSetDataAsYearsArrayFn = (validYears, focusAreaSlug, setData) => data => {
  const createYearObject = (year, index) => ({
    value: year,
    disabled:
      !data ||
      !data[index] ||
      !data[index].data ||
      !data[index].data.items.find(({ slug }) => slug === focusAreaSlug),
  });

  const validYearsArray = validYears.map(createYearObject);
  setData(validYearsArray);
};

const useUpdateYearsData = (initialUrl, initialFocusArea) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [focusAreaSlug, setFocusArea] = useState(initialFocusArea);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const validYears = calcValidYearsRange(url);

  const fetchData = createFetchDataFn(
    setIsError,
    setIsLoading,
    createSetDataAsYearsArrayFn(validYears, focusAreaSlug, setData),
  );

  useEffect(() => {
    const validYearUrls = validYears.map(createEndpointUrl);
    fetchData(validYearUrls);
  }, [url]);

  return [{ data, isLoading, isError }, { setUrl, setFocusArea }];
};

export default useUpdateYearsData;
