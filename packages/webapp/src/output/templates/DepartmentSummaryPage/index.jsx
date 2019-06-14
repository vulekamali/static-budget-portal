/* eslint-disable filenames/match-exported */

import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import onUrlChange from './onUrlChange';
import constructGetDepartmentData from './constructGetDepartmentData';
import constructGetValidYearsFn from './constructGetValidYearsFn';
import DepartmentSummary from '../../../views/DepartmentSummary';

const DepartmentSummaryPage = ({ latestYear }) => {
  const renderProp = ({
    match: {
      params: { startingSelectedYear, startingDepartmentSlug, sphere, government },
    },
  }) => {
    const [startingSelectedDepartment, setStartingSelectedDepartment] = useState(null);

    axios
      .get(`/json/${startingSelectedYear}/previews/${sphere}/${government}/original.json`)
      .then(({ data: { data: { items } } }) => {
        const focusAreaTitle = items.find(({ slug }) => slug === startingDepartmentSlug).title;
        setStartingSelectedDepartment(focusAreaTitle);
      });

    if (!startingSelectedDepartment) {
      return null;
    }

    const passedProps = {
      startingSelectedYear,
      startingSelectedDepartment,
      latestYear,
      onUrlChange,
      constructGetDepartmentData,
      constructGetValidYearsFn,
      sphere,
      government,
    };

    return <DepartmentSummary {...passedProps} />;
  };

  return (
    <Router>
      <Route
        path="/:startingSelectedYear/previews/:sphere/:government/:startingDepartmentSlug"
        component={renderProp}
      />
    </Router>
  );
};

export default DepartmentSummaryPage;
