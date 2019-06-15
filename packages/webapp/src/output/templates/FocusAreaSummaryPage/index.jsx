/* eslint-disable filenames/match-exported */

import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import onUrlChange from './onUrlChange';
import constructGetFocusAreaData from './constructGetFocusAreaData';
import constructGetValidYearsFn from './constructGetValidYearsFn';
import FocusAreaSummary from '../../../views/FocusAreaSummary';

const FocusAreaSummaryPage = ({ latestYear }) => {
  const renderProp = ({
    match: {
      params: { startingSelectedYear, startingFocusAreaSlug },
    },
  }) => {
    const [startingSelectedFocusArea, setStartingSelectedFocusArea] = useState(null);

    axios
      .get(`/json/previews/${startingSelectedYear}/focus.json`)
      .then(({ data: { data: { items } } }) => {
        const focusAreaTitle = items.find(({ slug }) => slug === startingFocusAreaSlug).title;
        setStartingSelectedFocusArea(focusAreaTitle);
      });

    if (!startingSelectedFocusArea) {
      return null;
    }

    const passedProps = {
      startingSelectedYear,
      startingSelectedFocusArea,
      latestYear,
      onUrlChange,
      constructGetFocusAreaData,
      constructGetValidYearsFn,
    };

    return <FocusAreaSummary {...passedProps} />;
  };

  return (
    <Router>
      <Route
        path="/:startingSelectedYear/previews/focus/:startingFocusAreaSlug"
        component={renderProp}
      />
    </Router>
  );
};

export default FocusAreaSummaryPage;
