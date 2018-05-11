import fetchWrapper from './../../../../utilities/js/helpers/fetchWrapper.js';
import normaliseReturn from './normaliseReturn.js';
import highlightResults from './highlightResults.js';
import createPromiseToken from './../../../../utilities/js/helpers/createPromiseToken.js';


export default function getLandingResults(phrase) {
  const normaliseOtherYears = (response) => {
    const { items } = response.result.search_facets.vocab_financial_years;
    return items.reverse().map(({ count, name }) => {
      const url = `/${name}/search-result?search=${phrase}`;

      return {
        count,
        name,
        url,
      };
    });
  };

  const request = new Promise((resolve, reject) => {
    const urlsArray = [
      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=3&fq=+organization:national-treasury+vocab_financial_years:2018-19+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]+vocab_spheres:national&ext_highlight=true`,
      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=0&fq=+organization:national-treasury+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]+vocab_spheres:national&facet.field=[%22vocab_financial_years%22]`,
      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=3&fq=+organization:national-treasury+vocab_financial_years:2018-19+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]+vocab_spheres:provincial&ext_highlight=true`,
      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=0&fq=+organization:national-treasury+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]+vocab_spheres:provincial&facet.field=[%22vocab_financial_years%22]`,
    ];

    Promise.all(urlsArray.map(fetchWrapper))
      .then((returnArr) => {
        const [rawNational, rawNationalOtherYears, rawProvincial, rawProvincialOtherYears] = returnArr;

        const resultsArr = [rawNational, rawProvincial].map(normaliseReturn);
        const [national, provincial] = resultsArr.map(item => highlightResults(item, phrase));

        const nationalOtherYears = normaliseOtherYears(rawNationalOtherYears);
        const provincialOtherYears = normaliseOtherYears(rawProvincialOtherYears);

        resolve(
          {
            national: {
              ...national,
              otherYears: nationalOtherYears,
            },
            provincial: {
              ...provincial,
              otherYears: provincialOtherYears,
            },
          },
        );
      })
      .catch(reject);
  });

  return createPromiseToken(request);
}
