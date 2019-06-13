import React, { useEffect, useState } from 'react';
import Presentation from './Presentation';
import calcHeadingData from './calcHeadingData';
import calcChartData from './calcChartData';
import convertTitleToSlug from './convertTitleToSlug';

const FocusAreaSummary = props => {
  const {
    latestYear,
    startingSelectedYear,
    startingSelectedFocusArea,
    onUrlChange,
    constructGetFocusAreaData,
    constructGetValidYearsFn,
  } = props;

  const [componentMounted, setComponentMounted] = useState(false);

  const [selectedYear, changeSelectedYear] = useState(startingSelectedYear);
  const [selectedFocusArea, changeSelectedFocusArea] = useState(startingSelectedFocusArea);
  const [isError, setError] = useState(false);

  const [focusAreas, setFocusAreas] = useState([]);
  const [focusAreasIsLoading, setFocusAreasLoading] = useState(false);

  const [validYears, setValidYears] = useState([]);
  const [validYearsIsLoading, setValidYearsLoading] = useState(false);

  const getPageData = constructGetFocusAreaData({ setFocusAreas, setFocusAreasLoading, setError });

  const getValidYears = constructGetValidYearsFn({
    setValidYears,
    setValidYearsLoading,
    setError,
    latestYear,
  });

  useEffect(() => {
    getPageData({ selectedYear });
  }, [selectedYear]);

  useEffect(() => {
    if (componentMounted) {
      const slug = convertTitleToSlug({ selectedFocusArea, focusAreas });
      onUrlChange({ selectedYear, slug });
    } else {
      setComponentMounted(true);
    }

    getValidYears({ selectedYear, selectedFocusArea });
  }, [selectedYear, selectedFocusArea]);

  const heading = calcHeadingData({
    values: {
      validYears,
      focusAreas,
      selectedYear,
      selectedFocusArea,
      latestYear,
    },
    status: {
      focusAreasIsLoading,
      validYearsIsLoading,
    },
    actions: {
      changeSelectedFocusArea,
      changeSelectedYear,
    },
  });

  const national = calcChartData({
    selectedFocusArea,
    selectedYear,
    type: 'national',
    focusAreas,
    focusAreasIsLoading,
  });

  const provincial = calcChartData({
    selectedFocusArea,
    selectedYear,
    type: 'provincial',
    focusAreas,
    focusAreasIsLoading,
  });

  const passedProps = {
    error: isError,
    heading,
    national,
    provincial,
  };

  return <Presentation {...passedProps} />;
};

export default FocusAreaSummary;
