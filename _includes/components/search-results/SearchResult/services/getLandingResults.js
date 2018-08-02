import fetchWrapper from './../../../../utilities/js/helpers/fetchWrapper.js';
import normaliseServerResponse from './normaliseServerResponse.js';
import highlightResults from './highlightResults.js';
import createPromiseToken from './../../../../utilities/js/helpers/createPromiseToken.js';
import parseStaticResponse from './parseStaticResponse.js';


export default function getLandingResults(phrase, year) {
  const normaliseOtherYears = (response, tab) => {
    const { items } = response.result.search_facets.vocab_financial_years;
    return items.reverse().map(({ count, name }) => {
      const url = `/${name}/search-result?search=${phrase}&view=${tab}`;

      return {
        count,
        name,
        url,
      };
    });
  };

  const request = new Promise((resolve, reject) => {
    const urlsArray = [
      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=3&fq=+organization:national-treasury+vocab_financial_years:${year}+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]+vocab_spheres:national&ext_highlight=true`,

      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=0&fq=+organization:national-treasury+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]+vocab_spheres:national&facet.field=[%22vocab_financial_years%22]`,

      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=3&fq=+organization:national-treasury+vocab_financial_years:${year}+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]+vocab_spheres:provincial&ext_highlight=true`,

      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=0&fq=+organization:national-treasury+extras_department_name_slug:[*%20TO%20*]+extras_geographic_region_slug:[*%20TO%20*]+vocab_spheres:provincial&facet.field=[%22vocab_financial_years%22]`,

      `https://data.vulekamali.gov.za/api/3/action/package_search?q=${encodeURI(phrase)}&start=0&rows=3&fq=-organization:national-treasury&ext_highlight=true`,

      '/json/static-search.json',
    ];

    Promise.all(urlsArray.map(fetchWrapper))
      .then((returnArr) => {
        const [
          rawNational,
          rawNationalOtherYears,
          rawProvincial,
          rawProvincialOtherYears,
          rawContributed,
          staticContent,
        ] = returnArr;

        const resultsArr = [rawNational, rawProvincial, rawContributed].map(normaliseServerResponse);
        const [national, provincial, contributed] = resultsArr.map((item) => {
          return highlightResults(item, phrase);
        });

        const nationalOtherYears = normaliseOtherYears(rawNationalOtherYears, 'national');
        const provincialOtherYears = normaliseOtherYears(rawProvincialOtherYears, 'provincial');
        const { videos, glossary } = parseStaticResponse(phrase, staticContent.videos, staticContent.glossary);

        resolve(
          {
            items: {
              national: {
                ...national,
                otherYears: nationalOtherYears,
              },
              provincial: {
                ...provincial,
                otherYears: provincialOtherYears,
              },
              contributed,
              videos,
              glossary,
            },
            count: national.count + provincial.count + contributed.count,
          },
        );
      })
      .catch(reject);
  });

  return createPromiseToken(request);
}
