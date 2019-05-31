import React, { useEffect, useState } from 'react';
import useUpdatePageData from './useUpdatePageData';
import useUpdateYearsData from './useUpdateYearsData';
import Presentation from './Presentation';
import colorsList from './colorsList';

const NewFocusArea = ({
  startingSelectedYear,
  latestYear,
  startingSelectedFocusArea,
  onUrlChange,
}) => {
  const [year, changeYear] = useState(startingSelectedYear);
  const [focusArea, changeFocusArea] = useState(startingSelectedFocusArea);
  const [pageData, setPageEndpoint] = useUpdatePageData(year);
  const [validYears, { setUrl, setFocusArea }] = useUpdateYearsData(latestYear, focusArea);

  useEffect(() => {
    setPageEndpoint(year);
  }, [year]);

  const focusAreasArray = pageData.data && pageData.data[0].data.items;

  const selectionOptions = focusAreasArray
    ? focusAreasArray.map(({ title }) => ({
        value: title,
      }))
    : [];

  const selectionDropdown = {
    initialSelected: focusArea,
    loading: pageData.isLoading,
    onSelectedChange: changeFocusArea,
    options: selectionOptions,
  };

  const yearDropdown = {
    initialSelected: year,
    loading: validYears.isLoading,
    onSelectedChange: changeYear,
    options: validYears.data,
  };

  const data = focusAreasArray && focusAreasArray.find(({ title }) => title === focusArea);

  useEffect(() => {
    if (data && onUrlChange) {
      onUrlChange(`/${year}/focus/${data.slug}`);
    }
    setFocusArea(focusArea);
    setUrl(year);
  }, [year, focusArea]);

  const nationalChartData = !data
    ? []
    : data.national.data.map(({ slug: id, title: name, ...otherProps }, index) => ({
        ...otherProps,
        id,
        name,
        url: `/${year}/national/departments/${id}`,
        color: colorsList[index],
      }));

  const national = {
    chartData: nationalChartData,
    chartLoading: pageData.isLoading,
    chartFooterData: data && data.national.footnotes,
    initialSelectedValues: {
      name: 'Contributing National Departments',
      color: 'grey',
      url: null,
      value: data && data.national.total,
    },
  };

  const provincialChartData = !data
    ? []
    : data.provincial.data.map(({ slug: id, title: name, ...otherProps }, index) => ({
        ...otherProps,
        id,
        name,
        url: `/${year}/national/departments/${id}`,
        color: colorsList[index],
      }));

  const provincial = {
    chartData: provincialChartData,
    chartLoading: pageData.isLoading,
    chartFooterData: data && data.provincial.footnotes,
    chartNoticesData: data && data.provincial.notices,
    initialSelectedValues: {
      name: 'Contributing Provincial Departments',
      color: 'grey',
      url: null,
      value: data && data.provincial.total,
    },
  };

  const passedProps = {
    error: !!pageData.error || !!validYears.error,
    heading: {
      selectionDropdown,
      yearDropdown,
    },
    national,
    provincial,
  };

  return <Presentation {...passedProps} />;
};

export default NewFocusArea;
