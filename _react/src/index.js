import 'core-js/es6/map';
import 'core-js/es6/set';
import ReactGA from 'react-ga';

import './utilities/css/globals.css';
import htmlConnect from './utilities/js/htmlConnect';
import VideoPreview from './components/public/VideoPreview';
import Documentation from './components/public/Documentation';
import Modal from './components/public/Modal';
import ProgrammesChart from './components/public/ProgrammesChart';
import ExpenditureChart from './components/public/ExpenditureChart';


ReactGA.initialize('UA-93649482-8');


htmlConnect(Documentation, 'Documentation', { url: 'string' })
htmlConnect(Modal, 'Modal')


const videoPreviewQuery = {
  title: 'string',
  description: 'string',
  languages: 'json',
  selected: 'string',
  loading: 'boolean',
}

htmlConnect(VideoPreview, 'VideoPreview', videoPreviewQuery)


const programmesNormaliseItem = (results, val) => {
  return {
    ...results,
    [val.name]: [val.total_budget],
  };
};


const programmesNormaliseFile = files => (results, key) => {
  const object = files[key].formats.reduce(
    (innerResults, val) => {
      return {
        ...innerResults,
        [`${key} (${val.format.replace(/^xls.+/i, 'Excel')})`]: val.url,
      };
    },
    {},
  );

  return {
    ...results,
    ...object,
  };
};


const programmesChartQuery = (node, nodeQuery) => {
  const values = nodeQuery({
    values: 'json',
    files: 'json',
    year: 'string',
    department: 'string',
    location: 'string',
  });

  return {
    items: values.values.reduce(programmesNormaliseItem, {}),
    year: values.year,
    files: Object.keys(values.files).reduce(programmesNormaliseFile(values.files), {}),
    location: values.location,
    department: values.department,
  };
};


htmlConnect(ProgrammesChart, 'ProgrammesChart', programmesChartQuery);


const removeNulls = val => val.amount !== null;
const normalisePhaseTable = val => [val.financial_year, val.phase];


const expenditureNormaliseItem = (results, val) => {
  return {
    ...results,
    [val.financial_year]: [val.amount],
  };
};


const normaliseFormats = (key) => {
  return (innerResults, val) => {
    return {
      ...innerResults,
      [`${key} (${val.format.replace(/^xls.+/i, 'Excel')})`]: val.url,
    };
  };
};

const normaliseFiles = (rawFiles) => {
  return (result, key) => {
    const object = rawFiles[key].formats.reduce(normaliseFormats(key), {});

    return {
      ...result,
      ...object,
    };
  };
};


const expenditureChartQuery = (node, nodeQuery) => {
  const values = nodeQuery({
    adjusted: 'json',
    notAdjusted: 'json',
    year: 'string',
    department: 'string',
    location: 'string',
    files: 'json',
    cpi: 'string',
  });

  
  const adjusted = values.adjusted.filter(removeNulls).reduce(expenditureNormaliseItem, {});
  const notAdjusted = values.notAdjusted.filter(removeNulls).reduce(expenditureNormaliseItem, {});

  return {
    items: { adjusted, notAdjusted },
    year: values.year,
    location: values.location,
    department: values.department,
    phaseTable: values.adjusted.filter(removeNulls).map(normalisePhaseTable),
    files: Object.keys(values.files).reduce(normaliseFiles(values.files), {}),
    cpi: values.cpi,
  };
};

htmlConnect(ExpenditureChart, 'ExpenditureChart', expenditureChartQuery);