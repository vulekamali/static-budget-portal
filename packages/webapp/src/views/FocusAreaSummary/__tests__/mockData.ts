/* eslint-disable sonarjs/no-duplicate-string */

import {
  Tprops,
  TconstructGetFocusAreaData,
  TconstructGetValidYearsFn,
  TgetValidYears,
  TconstructGetValidYearsFnProps,
  TconstructGetFocusAreaDataProps,
  TgetFocusAreaData,
} from '../types';

// Constant: validResponse
const focusAreas = [
  {
    national: {
      data: [
        {
          amount: 85306808000,
          slug: 'cooperative-governance-and-traditional-affairs',
          title: 'Cooperative Governance and Traditional Affairs',
          url:
            '2019-20/previews/national/south-africa/cooperative-governance-and-traditional-affairs',
        },
        {
          amount: 5531825000,
          slug: 'energy',
          title: 'Energy',
          url: '2019-20/previews/national/south-africa/energy',
        },
        {
          amount: 33879166000,
          slug: 'human-settlements',
          title: 'Human Settlements',
          url: '2019-20/previews/national/south-africa/human-settlements',
        },
        {
          amount: 14811251000,
          slug: 'national-treasury',
          title: 'National Treasury',
          url: '2019-20/previews/national/south-africa/national-treasury',
        },
        {
          amount: 30113823000,
          slug: 'transport',
          title: 'Transport',
          url: '2019-20/previews/national/south-africa/transport',
        },
        {
          amount: 10650687000,
          slug: 'water-and-sanitation',
          title: 'Water and Sanitation',
          url: '2019-20/previews/national/south-africa/water-and-sanitation',
        },
      ],
      footnotes: ['**Source:** Estimates of National Expenditure 2019-20'],
      notices: [],
      total: 180293560000,
    },
    provincial: {
      data: [],
      footnotes: [],
      notices: [
        'Provincial budget allocations to focus areas for 2019-20 not published yet on vulekamali.',
      ],
      total: null,
    },
    slug: 'example-1',
    title: 'Example 1',
  },
  {
    national: {
      data: [
        {
          amount: 202207844000,
          slug: 'national-treasury',
          title: 'National Treasury',
          url: '2019-20/previews/national/south-africa/national-treasury',
        },
      ],
      footnotes: ['**Source:** Estimates of National Expenditure 2019-20'],
      notices: [],
      total: 202207844000,
    },
    provincial: {
      data: [],
      footnotes: [],
      notices: [
        'Provincial budget allocations to focus areas for 2019-20 not published yet on vulekamali.',
      ],
      total: null,
    },
    slug: 'example-2',
    title: 'Example 2',
  },
  {
    national: {
      data: [
        {
          amount: 7664889000,
          slug: 'agriculture-forestry-and-fisheries',
          title: 'Agriculture, Forestry and Fisheries',
          url: '2019-20/previews/national/south-africa/agriculture-forestry-and-fisheries',
        },
        {
          amount: 4046624000,
          slug: 'cooperative-governance-and-traditional-affairs',
          title: 'Cooperative Governance and Traditional Affairs',
          url:
            '2019-20/previews/national/south-africa/cooperative-governance-and-traditional-affairs',
        },
        {
          amount: 1045393000,
          slug: 'economic-development',
          title: 'Economic Development',
          url: '2019-20/previews/national/south-africa/economic-development',
        },
        {
          amount: 1908196000,
          slug: 'energy',
          title: 'Energy',
          url: '2019-20/previews/national/south-africa/energy',
        },
        {
          amount: 7529671000,
          slug: 'environmental-affairs',
          title: 'Environmental Affairs',
          url: '2019-20/previews/national/south-africa/environmental-affairs',
        },
        {
          amount: 3435133000,
          slug: 'labour',
          title: 'Labour',
          url: '2019-20/previews/national/south-africa/labour',
        },
        {
          amount: 2005220000,
          slug: 'mineral-resources',
          title: 'Mineral Resources',
          url: '2019-20/previews/national/south-africa/mineral-resources',
        },
        {
          amount: 6374576000,
          slug: 'national-treasury',
          title: 'National Treasury',
          url: '2019-20/previews/national/south-africa/national-treasury',
        },
        {
          amount: 7124662000,
          slug: 'public-works',
          title: 'Public Works',
          url: '2019-20/previews/national/south-africa/public-works',
        },
        {
          amount: 10946208000,
          slug: 'rural-development-and-land-reform',
          title: 'Rural Development and Land Reform',
          url: '2019-20/previews/national/south-africa/rural-development-and-land-reform',
        },
        {
          amount: 8150968998,
          slug: 'science-and-technology',
          title: 'Science and Technology',
          url: '2019-20/previews/national/south-africa/science-and-technology',
        },
        {
          amount: 2568552000,
          slug: 'small-business-development',
          title: 'Small Business Development',
          url: '2019-20/previews/national/south-africa/small-business-development',
        },
        {
          amount: 1684574000,
          slug: 'telecommunications-and-postal-services',
          title: 'Telecommunications and Postal Services',
          url: '2019-20/previews/national/south-africa/telecommunications-and-postal-services',
        },
        {
          amount: 2392670000,
          slug: 'tourism',
          title: 'Tourism',
          url: '2019-20/previews/national/south-africa/tourism',
        },
        {
          amount: 10059027000,
          slug: 'trade-and-industry',
          title: 'Trade and Industry',
          url: '2019-20/previews/national/south-africa/trade-and-industry',
        },
        {
          amount: 34090778000,
          slug: 'transport',
          title: 'Transport',
          url: '2019-20/previews/national/south-africa/transport',
        },
        {
          amount: 5789685000,
          slug: 'water-and-sanitation',
          title: 'Water and Sanitation',
          url: '2019-20/previews/national/south-africa/water-and-sanitation',
        },
      ],
      footnotes: ['**Source:** Estimates of National Expenditure 2019-20'],
      notices: [],
      total: 116816826998,
    },
    provincial: {
      data: [],
      footnotes: [],
      notices: [
        'Provincial budget allocations to focus areas for 2019-20 not published yet on vulekamali.',
      ],
      total: null,
    },
    slug: 'example-3',
    title: 'Example 3',
  },
  {
    national: {
      data: [
        {
          amount: 38437000,
          slug: 'centre-for-public-service-innovation',
          title: 'Centre for Public Service Innovation',
          url: null,
        },
        {
          amount: 1576091000,
          slug: 'communications',
          title: 'Communications',
          url: '2019-20/previews/national/south-africa/communications',
        },
        {
          amount: 1364355000,
          slug: 'cooperative-governance-and-traditional-affairs',
          title: 'Cooperative Governance and Traditional Affairs',
          url:
            '2019-20/previews/national/south-africa/cooperative-governance-and-traditional-affairs',
        },
        {
          amount: 441683000,
          slug: 'government-communication-and-information-system',
          title: 'Government Communication and Information System',
          url: null,
        },
        {
          amount: 6508515000,
          slug: 'international-relations-and-cooperation',
          title: 'International Relations and Cooperation',
          url: '2019-20/previews/national/south-africa/international-relations-and-cooperation',
        },
        {
          amount: 187905000,
          slug: 'national-school-of-government',
          title: 'National School of Government',
          url: null,
        },
        {
          amount: 17936303000,
          slug: 'national-treasury',
          title: 'National Treasury',
          url: '2019-20/previews/national/south-africa/national-treasury',
        },
        {
          amount: 2520978000,
          slug: 'parliament',
          title: 'Parliament',
          url: '2019-20/previews/national/south-africa/parliament',
        },
        {
          amount: 956939000,
          slug: 'planning-monitoring-and-evaluation',
          title: 'Planning, Monitoring and Evaluation',
          url: '2019-20/previews/national/south-africa/planning-monitoring-and-evaluation',
        },
        {
          amount: 293030000,
          slug: 'public-enterprises',
          title: 'Public Enterprises',
          url: '2019-20/previews/national/south-africa/public-enterprises',
        },
        {
          amount: 1002143000,
          slug: 'public-service-and-administration',
          title: 'Public Service and Administration',
          url: '2019-20/previews/national/south-africa/public-service-and-administration',
        },
        {
          amount: 278229000,
          slug: 'public-service-commission',
          title: 'Public Service Commission',
          url: null,
        },
        {
          amount: 684326000,
          slug: 'public-works',
          title: 'Public Works',
          url: '2019-20/previews/national/south-africa/public-works',
        },
        {
          amount: 2514368000,
          slug: 'statistics-south-africa',
          title: 'Statistics South Africa',
          url: '2019-20/previews/national/south-africa/statistics-south-africa',
        },
        {
          amount: 698608000,
          slug: 'the-presidency',
          title: 'The Presidency',
          url: '2019-20/previews/national/south-africa/the-presidency',
        },
        {
          amount: 163351000,
          slug: 'traditional-affairs',
          title: 'Traditional Affairs',
          url: null,
        },
        {
          amount: 244398000,
          slug: 'women',
          title: 'Women',
          url: '2019-20/previews/national/south-africa/women',
        },
      ],
      footnotes: [
        '**Source:** Estimates of National Expenditure 2019-20',
        '**Note:** Provincial Equitable Share is excluded',
      ],
      notices: [],
      total: 542963412000,
    },
    provincial: {
      data: [],
      footnotes: [],
      notices: [
        'Provincial budget allocations to focus areas for 2019-20 not published yet on vulekamali.',
      ],
      total: null,
    },
    slug: 'example-4',
    title: 'Example 4',
  },
];

// Helper: constructGetValidYearsFnMock
const constructGetValidYearsFnMock: TconstructGetValidYearsFn = ({
  setValidYears,
  setValidYearsLoading,
}: TconstructGetValidYearsFnProps): TgetValidYears => (): void => {
  setValidYearsLoading(true);

  setTimeout((): void => {
    setValidYears([true, false, true, true]);
    setValidYearsLoading(false);
  }, 3000);
};

// Helper: constructGetFocusAreaDataMock
const constructGetFocusAreaDataMock: TconstructGetFocusAreaData = ({
  setFocusAreas,
  setFocusAreasLoading,
}: TconstructGetFocusAreaDataProps): TgetFocusAreaData => (): void => {
  setFocusAreasLoading(true);
  setFocusAreas([]);

  setTimeout((): void => {
    setFocusAreas(focusAreas);
    setFocusAreasLoading(false);
  }, 3000);
};

// Constant: defaultProps
export const defaultProps: Tprops = {
  latestYear: '2019-20',
  startingSelectedYear: '2016-17',
  startingSelectedFocusArea: 'Example 1',
  onUrlChange: ({ selectedYear, slug }): void =>
    // eslint-disable-next-line no-console
    console.log(`Url changed to "/${selectedYear}/focus/${slug}`),
  constructGetFocusAreaData: constructGetFocusAreaDataMock,
  constructGetValidYearsFn: constructGetValidYearsFnMock,
};

export default { defaultProps };
