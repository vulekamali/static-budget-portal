/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/camelcase */

import {
  Tprops,
  TconstructDepartmentsData,
  TconstructGetValidYearsFn,
  TgetValidYears,
  TconstructGetValidYearsFnProps,
  TconstructGetDepartmentsProps,
  TgetDepartmentsaData,
} from '../types';

// Constant: validResponse
const departments = [
  {
    description:
      '## Vote purpose \n\nLead, support and promote agricultural, forestry and fisheries resources management through policies, strategies and programmes to enhance sustainable use and achieve economic growth, job creation, food security, rural development and transformation.\n\n## Vote mandate\n\nThe mandate of the Department of Agriculture, Forestry and Fisheries includes value chains, inputs, production and consumption in the agriculture, forestry and fishery sectors. The department’s mandate is derived from a range of legislation, including the Sea Fishery Act (1988), the National Forests Act (1998), the Agricultural Products Standards Act (1990), and the Conservation of Agricultural Resources Act (1983).',
    focus_areas: [
      {
        slug: 'economic-development',
        title: 'Economic development',
        url: '2019-20/focus/economic-development',
      },
    ],
    percentage_of_budget: 0.47125122255114543,
    programmes: [
      {
        amount: 935725000.0,
        percentage: 12.207939345240355,
        slug: 'administration',
        title: 'Administration',
      },
      {
        amount: 2642479000.0,
        percentage: 34.475111120330645,
        slug: 'agricultural-production-health-and-food-safety',
        title: 'Agricultural Production, Health And Food Safety',
      },
      {
        amount: 519723000.0,
        percentage: 6.780567859495422,
        slug: 'fisheries',
        title: 'Fisheries',
      },
      {
        amount: 2237026000.0,
        percentage: 29.185367198403007,
        slug: 'food-security-and-agrarian-reform',
        title: 'Food Security And Agrarian Reform',
      },
      {
        amount: 1039051000.0,
        percentage: 13.55598235016841,
        slug: 'forestry-and-natural-resources-management',
        title: 'Forestry And Natural Resources Management',
      },
      {
        amount: 290885000.0,
        percentage: 3.7950321263621687,
        slug: 'trade-promotion-and-market-access',
        title: 'Trade Promotion And Market Access',
      },
    ],
    slug: 'example-1',
    title: 'Example 1',
    total: 7664889000.0,
  },
  {
    description:
      '## Vote purpose \r\n\r\nContribute to sustainable economic development and enhance job creation by preserving, protecting and developing South African arts, culture and heritage to sustain a socially cohesive and democratic nation.\r\n\r\n## Vote mandate\r\n\r\nThe Department of Arts and Culture derives its mandate from the following legislation: \r\n\r\n- the Heraldry Act (1962)\r\n- the Culture Promotion Act (1983)\r\n- the National Archives and Record Services of South Africa Act (1996)\r\n- the Legal Deposit Act (1997)\r\n- the South African Geographical Names Council Act (1998)\r\n- the Cultural Institutions Act (1998)\r\n- the National Heritage Resources Act (1999)\r\n- the National Council for Library and Information Act (2001)\r\n- the Use of Official Languages Act (2012). \r\n\r\nBroadly, this legislation mandates the department to:\r\n\r\n- preserve, develop, protect and promote the cultural, heritage and linguistic diversity and legacy of South Africa\r\n- lead nation building and social cohesion through societal transformation \r\n- enhance archives and records management structures and systems, and promote access to information \r\n- provide leadership to the arts and culture sector so as to accelerate its transformation.',
    focus_areas: [
      {
        slug: 'learning-and-culture',
        title: 'Learning and culture',
        url: '2019-20/focus/learning-and-culture',
      },
    ],
    percentage_of_budget: 0.28389131941265894,
    programmes: [
      {
        amount: 308274000.0,
        percentage: 6.676231758197374,
        slug: 'administration',
        title: 'Administration',
      },
      {
        amount: 1132238000.0,
        percentage: 24.520664387648257,
        slug: 'arts-and-culture-promotion-and-development',
        title: 'Arts And Culture Promotion And Development',
      },
      {
        amount: 3026580000.0,
        percentage: 65.54607107548807,
        slug: 'heritage-promotion-and-preservation',
        title: 'Heritage Promotion And Preservation',
      },
      {
        amount: 150393000.0,
        percentage: 3.2570327786663085,
        slug: 'institutional-governance',
        title: 'Institutional Governance',
      },
    ],
    slug: 'example-2',
    title: 'Example 2',
    total: 4617485000.0,
  },
  {
    description:
      '## Vote purpose \r\n\r\nDevelop, maintain and support a South African school education system for the 21st century.\r\n\r\n## Vote mandate\r\n\r\nThe Department of Basic Education derives its mandate from the following legislation:\r\n\r\n- the National Education Policy Act (1996), which inscribed into law the policies, the legislative and monitoring responsibilities of the Minister of Basic Education, and the formal relations between national and provincial authorities\r\n- the South African Schools Act (1996), which promotes access to education, promotes quality and democratic governance in the schooling system, and makes schooling compulsory for children aged 7 to 15, to ensure that all learners have access to quality education without discrimination\r\n- the Employment of Educators Act (1998), which regulates the professional, moral and ethical responsibilities of educators, as well as the competency requirements for teachers.',
    focus_areas: [
      {
        slug: 'learning-and-culture',
        title: 'Learning and culture',
        url: '2019-20/focus/learning-and-culture',
      },
    ],
    percentage_of_budget: 1.506582833983955,
    programmes: [
      {
        amount: 496253000.0,
        percentage: 2.025147920602928,
        slug: 'administration',
        title: 'Administration',
      },
      {
        amount: 1988959000.0,
        percentage: 8.116698907642835,
        slug: 'curriculum-policy-support-and-monitoring',
        title: 'Curriculum Policy, Support And Monitoring',
      },
      {
        amount: 7508789000.0,
        percentage: 30.64245138990826,
        slug: 'educational-enrichment-services',
        title: 'Educational Enrichment Services',
      },
      {
        amount: 13144331000.0,
        percentage: 53.640410420423876,
        slug: 'planning-information-and-assessment',
        title: 'Planning, Information And Assessment',
      },
      {
        amount: 1366199000.0,
        percentage: 5.5752913614220985,
        slug: 'teachers-education-human-resources-and-institutional-development',
        title: 'Teachers, Education Human Resources And Institutional Development',
      },
    ],
    slug: 'example-3',
    title: 'Example 3',
    total: 24504531000.0,
  },
  {
    description:
      '## Vote purpose \r\n\r\nCreate an enabling environment for the provision of inclusive communication services to all South Africans in a manner that promotes socioeconomic development and investment through broadcasting, new media, print media and other new technologies. Brand the country locally and internationally.\r\n\r\n## Vote mandate\r\n\r\nThe Department of Communications is responsible for the national communications policy and strategy; information dissemination and publicity; and the branding of South Africa. Improved communication and marketing will promote an informed citizenry and assist the country in promoting investments, economic growth and job creation. The department’s mandate is derived from section 192 of the Constitution, which provides for the independence of broadcasting regulation in the public interest, the International Telecommunications Union and the World Intellectual Property Organisation.\r\nThe department is responsible for the administration and implementation of:\r\n-  the Films and Publications Act (1996)\r\n-  the Broadcasting Act (1999)\r\n- the Media Development and Diversity Agency Act (2002)\r\n- the Independent Communications Authority of South Africa Act (2000), a joint responsibility with the Minister of Telecommunications and Postal Services\r\n- the Electronic Communications and Transactions Act (2002), a joint responsibility with the Minister of Telecommunications and Postal Services\r\n- the Electronic Communications and Transactions Act (2005), a joint responsibility with the Minister of Telecommunications and Postal Services.',
    focus_areas: [
      {
        slug: 'general-public-services',
        title: 'General public services',
        url: '2019-20/focus/general-public-services',
      },
    ],
    percentage_of_budget: 0.0969009219314014,
    programmes: [
      {
        amount: 64879000.0,
        percentage: 4.116450128831393,
        slug: 'administration',
        title: 'Administration',
      },
      {
        amount: 16412000.0,
        percentage: 1.0413104319484092,
        slug: 'communications-policy-research-and-development',
        title: 'Communications Policy, Research And Development',
      },
      {
        amount: 1447351000.0,
        percentage: 91.83168992145758,
        slug: 'entity-oversight',
        title: 'Entity Oversight',
      },
      {
        amount: 47449000.0,
        percentage: 3.0105495177626165,
        slug: 'industry-and-capacity-development',
        title: 'Industry And Capacity Development',
      },
    ],
    slug: 'example-4',
    title: 'Example 4',
    total: 1576091000.0,
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
const constructGetFocusAreaDataMock: TconstructDepartmentsData = ({
  setDepartments,
  setDepartmentsLoading,
}: TconstructDepartmentsDataProps): TgetDepartmentData => (): void => {
  setDepartmentsLoading(true);
  setDepartments([]);

  setTimeout((): void => {
    setDepartments(departments);
    setDepartmentsLoading(false);
  }, 3000);
};

// Constant: defaultProps
export const defaultProps: Tprops = {
  latestYear: '2019-20',
  startingSelectedYear: '2016-17',
  startingSelectedDepartment: 'Example 1',
  sphere: 'provincial',
  government: 'kwazulu-natal',
  onUrlChange: ({ selectedYear, slug, sphere, government }): void =>
    // eslint-disable-next-line no-console
    console.log(`Url changed to "/${selectedYear}/previews/${sphere}/${government}/${slug}`),
  constructGetFocusAreaData: constructGetFocusAreaDataMock,
  constructGetValidYearsFn: constructGetValidYearsFnMock,
};

export default { defaultProps };
