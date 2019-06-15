import React, { useEffect, useState } from 'react';
import Presentation from './Presentation';
import calcHeadingData from './calcHeadingData';
import calcIntroduction from './calcIntroduction';
import calcProgrammes from './calcProgrammes';
import calcRelatedFocusAreas from './calcRelatedFocusAreas';
import convertTitleToSlug from './convertTitleToSlug';

const DepartmentSummary = props => {
  const {
    latestYear,
    startingSelectedYear,
    startingSelectedDepartment,
    onUrlChange,
    constructGetDepartmentData,
    constructGetValidYearsFn,
    sphere,
    government,
  } = props;

  const [componentMounted, setComponentMounted] = useState(false);

  const [selectedYear, changeSelectedYear] = useState(startingSelectedYear);
  const [selectedDepartment, changeSelectedDepartment] = useState(startingSelectedDepartment);
  const [isError, setError] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [departmentsIsLoading, setDepartmentsLoading] = useState(false);

  const [validYears, setValidYears] = useState([]);
  const [validYearsIsLoading, setValidYearsLoading] = useState(false);

  const getPageData = constructGetDepartmentData({
    setDepartments,
    setDepartmentsLoading,
    setError,
    sphere,
    government,
  });

  const getValidYears = constructGetValidYearsFn({
    setValidYears,
    setValidYearsLoading,
    setError,
    latestYear,
    sphere,
    government,
  });

  useEffect(() => {
    getPageData({ selectedYear });
  }, [selectedYear]);

  useEffect(() => {
    if (componentMounted) {
      const slug = convertTitleToSlug({ selectedDepartment, departments });
      onUrlChange({ selectedYear, slug, sphere, government });
    } else {
      setComponentMounted(true);
    }

    getValidYears({ selectedDepartment });
  }, [selectedYear, selectedDepartment]);

  const heading = calcHeadingData({
    values: {
      validYears,
      departments,
      selectedYear,
      selectedDepartment,
      latestYear,
      government,
    },
    status: {
      departmentsIsLoading,
      validYearsIsLoading,
    },
    actions: {
      changeSelectedDepartment,
      changeSelectedYear,
    },
  });

  const introduction = calcIntroduction({ departments, selectedDepartment, sphere });
  const relatedFocusAreas = calcRelatedFocusAreas({ departments, selectedDepartment });

  const programmes = calcProgrammes({
    departmentsIsLoading,
    selectedYear,
    selectedDepartment,
    departments,
  });

  const passedProps = {
    error: isError,
    heading,
    introduction,
    programmes,
    relatedFocusAreas,
  };

  return <Presentation {...passedProps} />;
};

export default DepartmentSummary;
