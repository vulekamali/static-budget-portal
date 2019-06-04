import axios from 'axios';

const forceToArrayIfNeeded = value => (Array.isArray(value) ? value : [value]);
const extractDataProperty = ({ data }) => data;

const createFetchDataFn = (setIsError, setIsLoading, setData) => async urls => {
  const initialUrls = forceToArrayIfNeeded(urls);
  setIsError(false);
  setIsLoading(true);

  try {
    const pendingPromises = initialUrls.map(axios);
    const results = await Promise.all(pendingPromises);
    setData(results.map(extractDataProperty));
  } catch (error) {
    setIsError(true);
  }

  setIsLoading(false);
};

export default createFetchDataFn;
