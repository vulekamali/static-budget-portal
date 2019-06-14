import 'core-js/fn/object/assign';
import 'core-js/fn/array/find';
import 'core-js/fn/promise';
import 'core-js/fn/weak-set';
import 'core-js/fn/weak-map';
import 'core-js/fn/set';
import 'core-js/fn/map';

import React from 'react';
import { render } from 'react-dom';

import './adaptors/homepage-hero';
import './adaptors/infrastructure-pages';
import './adaptors/national-treemap';
import './adaptors/provincial-treemap';
import './adaptors/preview-pages';
import './adaptors/consolidated-treemap';
import './adaptors/resources-homepage';

import FocusAreaSummaryPage from './output/templates/FocusAreaSummaryPage';
import DepartmentSummaryPage from './output/templates/DepartmentSummaryPage';

const focusAreaSummaryPageNode = document.querySelector('[data-webapp="FocusAreaSummaryPage"]');
const departmentSummaryPageNode = document.querySelector('[data-webapp="DepartmentSummaryPage"]');

if (focusAreaSummaryPageNode) {
  const latestYear = focusAreaSummaryPageNode.getAttribute('data-webapp-latestYear');
  render(<FocusAreaSummaryPage {...{ latestYear }} />, focusAreaSummaryPageNode);
}

if (departmentSummaryPageNode) {
  const latestYear = departmentSummaryPageNode.getAttribute('data-webapp-latestYear');
  render(<DepartmentSummaryPage {...{ latestYear }} />, departmentSummaryPageNode);
}
