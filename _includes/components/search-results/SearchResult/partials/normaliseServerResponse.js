import { find } from 'lodash';
import extractSnippet from './extractSnippet.js';


const normaliseDepartmentItem = (item) => {
  const { extras, province, financial_year: financialYear } = item;

  const getExtrasValue = (key) => {
    const obj = find(extras, extra => extra.key === key) || { value: null };
    return obj.value;
  };

  const year = financialYear[0];
  const region = getExtrasValue('geographic_region_slug');
  const regionString = region === 'south-africa' ? 'National' : province[0];
  const regionSlug = region === 'south-africa' ? 'national' : `provincial/${region}`;

  const nameSlug = getExtrasValue('department_name_slug');
  const nameString = getExtrasValue('department_name');
  const snippet = extractSnippet(item);

  return {
    title: `${regionString} Department: ${nameString}`,
    url: `https://vulekamali.gov.za/${year}/${regionSlug}/departments/${nameSlug}`,
    snippet,
  };
};


const normaliseCsoItem = (item) => {
  const { title, name, organization = {} } = item;

  return {
    organisation: organization.title,
    title,
    url: `/datasets/${name}`,
    snippet: extractSnippet(item),
  };
};


const calcNormaliseType = (results, tab) => {
  if (tab === 'cso') {
    return results.map(normaliseCsoItem);
  }

  return results.map(normaliseDepartmentItem);
};


export default function normaliseServerResponse(reponseObj, tab) {
  const { count, results } = reponseObj.result;
  return {
    count,
    items: calcNormaliseType(results, tab),
  };
}
