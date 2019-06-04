import { useState, useEffect } from 'react';
import createFetchDataFn from './createFetchDataFn';

const calcSphere = government => {
  if (government === 'south-africa') {
    return 'national/south-africa';
  }

  return `provincial/${government}`;
};

const createEndpointUrl = (year, government) =>
  `/json/${year}/${calcSphere(government)}/original.json`;

const useUpdatePageData = (initialUrl, government) => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = createFetchDataFn(setIsError, setIsLoading, setData);

  useEffect(() => {
    fetchData(createEndpointUrl(url, government));
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useUpdatePageData;
