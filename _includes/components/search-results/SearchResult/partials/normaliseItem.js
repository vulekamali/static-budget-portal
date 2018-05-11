import extractSnippet from './extractSnippet.js';
import { find } from 'lodash';

export default function normaliseItem(item) {
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
}
