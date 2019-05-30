import { useState, useEffect } from 'react';
import createFetchDataFn from './createFetchDataFn';

const createEndpointUrl = year => `/json/${year}/focus.json`;

const useUpdatePageData = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData || null);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = createFetchDataFn(setIsError, setIsLoading, setData);
  useEffect(() => {
    fetchData(createEndpointUrl(url));
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useUpdatePageData;
