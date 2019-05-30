import React, { useEffect, useState } from 'react';
import useUpdatePageData from './useUpdatePageData';
import useUpdateYearsData from './useUpdateYearsData';

const NewFocusArea = ({ startingSelectedYear, latestYear }) => {
  const [selectedYear, changeYear] = useState(startingSelectedYear);
  const [pageData, setPageEndpoint] = useUpdatePageData(selectedYear);
  const [yearsData] = useUpdateYearsData(latestYear);

  useEffect(() => {
    setPageEndpoint(selectedYear);
  }, [selectedYear]);

  const passedProps = {
    selectedYear,
    pageData,
    yearsData,
    setPageEndpoint,
  };

  return (
    <div>
      <code>
        <pre>{JSON.stringify(passedProps, null, 2)}</pre>
      </code>
    </div>
  );
};

export default NewFocusArea;
