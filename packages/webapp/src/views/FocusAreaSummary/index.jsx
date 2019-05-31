import React, { useEffect, useState } from 'react';
import useUpdatePageData from './useUpdatePageData';
import useUpdateYearsData from './useUpdateYearsData';

const NewFocusArea = ({ startingSelectedYear, latestYear, startingSelectedFocusArea }) => {
  const [year, changeYear] = useState(startingSelectedYear);
  const [focusAreaSlug, changeFocusAreaSlug] = useState(startingSelectedFocusArea);
  const [pageData, setPageEndpoint] = useUpdatePageData(year);
  const [validYears, { setUrl, setFocusArea }] = useUpdateYearsData(latestYear, focusAreaSlug);

  useEffect(() => {
    setPageEndpoint(year);
  }, [year]);

  useEffect(() => {
    setFocusArea(focusAreaSlug);
    setUrl(year);
  }, [year, focusAreaSlug]);

  const focusAreasArray = pageData.data && pageData.data[0].data.items;
  const button = `/${year}/focus/${focusAreaSlug}`;

  const selectionOptions =
    focusAreasArray &&
    focusAreasArray.map(({ slug, name }) => ({
      value: slug,
    }));

  const changeToNewFocusArea = newFocusName => {
    const selected = focusAreasArray && focusAreasArray.find(({ name }) => name === newFocusName);
    const slug = selected && selected.slug;

    if (slug) {
      changeFocusAreaSlug(slug);
    }
  };

  const selectionDropdown = {
    intialSelected: focusAreaSlug,
    loading: pageData.isLoading,
    onSelectedChange: changeToNewFocusArea,
    options: selectionOptions,
  };

  const yearDropdown = {
    intialSelected: year,
    loading: validYears.isLoading,
    onSelectedChange: changeYear,
    options: validYears.data,
  };

  const data = focusAreasArray && focusAreasArray.find(({ slug }) => slug === focusAreaSlug);

  const national = {
    chartData: [],
    chartLoading: pageData.isLoading,
    chartFooterData: data && data.national.footnotes,
    initialSelectedValues: {
      name: 'Contributing National Departments',
      color: 'grey',
      url: null,
      value: data && data.national.total,
    },
  };

  const provincial = {
    chartData: [],
    chartLoading: pageData.isLoading,
    chartFooterData: data && data.provincial.footnotes,
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
      button,
      selectionDropdown,
      yearDropdown,
    },
    national,
    provincial,
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
