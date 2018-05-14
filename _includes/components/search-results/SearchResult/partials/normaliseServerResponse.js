import { find } from 'lodash';
import extractSnippet from './extractSnippet.js';


const normaliseDepartmentItem = (item) => {
  const { extras, province, financial_year: financialYear, organization = {}, title: rawTitle } = item;

  const getExtrasValue = (key) => {
    const obj = find(extras, extra => extra.key === key) || { value: null };
    return obj.value;
  };

  const isOfficial = organization.title === 'National Treasury';

  const year = financialYear[0];
  const region = getExtrasValue('geographic_region_slug');
  const regionString = region === 'south-africa' ? 'National' : province[0];
  const regionSlug = region === 'south-africa' ? 'national' : `provincial/${region}`;

  const nameSlug = getExtrasValue('department_name_slug');
  const nameString = getExtrasValue('department_name');
  const snippet = extractSnippet(item);

  const title = isOfficial ?
    `${regionString} Department: ${nameString}` :
    rawTitle;

  const url = isOfficial ?
    `https://vulekamali.gov.za/${year}/${regionSlug}/departments/${nameSlug}` :
    `/datasets/${name}`;

  return { title, url, snippet, organisation: organization.title };
};


export default function normaliseServerResponse(reponseObj) {
  const { count, results } = reponseObj.result;

  return {
    count,
    items: results.map(normaliseDepartmentItem),
  };
}
