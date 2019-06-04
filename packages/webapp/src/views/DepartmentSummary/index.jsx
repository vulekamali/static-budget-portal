import React, { useEffect, useState } from 'react';
import Presentation from './Presentation';
import useUpdatePageData from './useUpdatePageData';
import useUpdateYearsData from './useUpdateYearsData';
import colorsList from './colorsList';

const DepartmentSummary = ({
  startingSelectedYear,
  latestYear,
  startingSelectedDepartment,
  government,
  onUrlChange,
}) => {
  const [year, changeYear] = useState(startingSelectedYear);
  const [department, changeDepartment] = useState(startingSelectedDepartment, government);
  const [pageData, setPageEndpoint] = useUpdatePageData(year, government);
  const [validYears, { setUrl, setDepartment }] = useUpdateYearsData(latestYear, department);

  useEffect(() => {
    setPageEndpoint(year);
  }, [year]);

  const departmentArray = pageData.data && pageData.data[0].data.items;

  const selectionOptions = departmentArray
    ? departmentArray.map(({ title }) => ({
        value: title,
      }))
    : [];

  console.log(departmentArray, '3333333333333333');

  const selectionDropdown = {
    initialSelected: department,
    loading: pageData.isLoading,
    onSelectedChange: changeDepartment,
    options: selectionOptions,
  };

  const yearDropdown = {
    initialSelected: year,
    loading: validYears.isLoading,
    onSelectedChange: changeYear,
    options: validYears.data,
  };

  const passedProps = {
    error: !!pageData.error || !!validYears.error,
    heading: {
      selectionDropdown,
      yearDropdown,
    },
    // national,
    // provincial,
  };

  return <Presentation {...passedProps} />;
};

export default DepartmentSummary;
