import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const valid = {
  data: {
    items: [
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
        slug: 'agriculture-forestry-and-fisheries',
        title: 'Agriculture, Forestry and Fisheries',
        total: 7664889000.0,
      },
      {
        description:
          '## Vote purpose \n\nContribute to sustainable economic development and enhance job creation by preserving, protecting and developing South African arts, culture and heritage to sustain a socially cohesive and democratic nation.\n\n## Vote mandate\n\nMandate\nThe Department of Arts and Culture derives its mandate from the following legislation: \n• the Heraldry Act (1962)\n• the Culture Promotion Act (1983)\n• the National Archives and Record Services of South Africa Act (1996)\n• the Legal Deposit Act (1997)\n• the South African Geographical Names Council Act (1998)\n• the Cultural Institutions Act (1998)\n• the National Heritage Resources Act (1999)\n• the National Council for Library and Information Act (2001)\n• the Use of Official Languages Act (2012). \nBroadly, this legislation mandates the department to:\n• preserve, develop, protect and promote the cultural, heritage and linguistic diversity and legacy of South Africa\n• lead nation building and social cohesion through societal transformation \n• enhance archives and records management structures and systems, and promote access to information \n• provide leadership to the arts and culture sector so as to accelerate its transformation.\n',
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
        slug: 'arts-and-culture',
        title: 'Arts and Culture',
        total: 4617485000.0,
      },
      {
        description:
          '## Vote purpose \n\nDevelop, maintain and support a South African school education system for the 21st century.\n\n## Vote mandate\n\nThe Department of Basic Education derives its mandate from the following legislation:\n• the National Education Policy Act (1996), which inscribed into law the policies, the legislative and monitoring responsibilities of the Minister of Basic Education, and the formal relations between national and provincial authorities\n• the South African Schools Act (1996), which promotes access to education, promotes quality and democratic governance in the schooling system, and makes schooling compulsory for children aged 7 to 15, to ensure that all learners have access to quality education without discrimination\n• the Employment of Educators Act (1998), which regulates the professional, moral and ethical responsibilities of educators, as well as the competency requirements for teachers.',
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
        slug: 'basic-education',
        title: 'Basic Education',
        total: 24504531000.0,
      },
      {
        description:
          '## Vote purpose \n\nCreate an enabling environment for the provision of inclusive communication services to all South Africans in a manner that promotes socioeconomic development and investment through broadcasting, new media, print media and other new technologies. Brand the country locally and internationally.\n\n## Vote mandate\n\nThe Department of Communications is responsible for the national communications policy and strategy; information dissemination and publicity; and the branding of South Africa. Improved communication and marketing will promote an informed citizenry and assist the country in promoting investments, economic growth and job creation. The department’s mandate is derived from section 192 of the Constitution, which provides for the independence of broadcasting regulation in the public interest, the International Telecommunications Union and the World Intellectual Property Organisation.\nThe department is responsible for the administration and implementation of:\n• the Films and Publications Act (1996)\n• the Broadcasting Act (1999)\n• the Media Development and Diversity Agency Act (2002)\n• the Independent Communications Authority of South Africa Act (2000), a joint responsibility with the Minister of Telecommunications and Postal Services\n• the Electronic Communications and Transactions Act (2002), a joint responsibility with the Minister of Telecommunications and Postal Services\n• the Electronic Communications and Transactions Act (2005), a joint responsibility with the Minister of Telecommunications and Postal Services.\n',
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
        slug: 'communications',
        title: 'Communications',
        total: 1576091000.0,
      },
      {
        description:
          '## Vote purpose \n\nImprove cooperative governance across the three spheres of government, in partnership with institutions of traditional leadership, to ensure that provinces and municipalities carry out their service delivery and development functions effectively. \n\n## Vote mandate\n\nThe Department of Cooperative Governance is mandated to: develop and monitor the implementation of national policy and legislation aimed at transforming and strengthening key institutions and mechanisms of governance in national, provincial and local government to fulfil their developmental role; develop, promote and monitor mechanisms, systems and structures to enable integrated service delivery and implementation within government; and promote sustainable development by providing support to and exercising oversight of provincial and local government. This mandate is derived from the following legislation:\n• the Intergovernmental Relations Framework Act (2005)\n• the Municipal Property Rates Act (2004)\n• the Municipal Systems Act (2000)\n• the Municipal Structures Act (1998)\n• the Disaster Management Act (2002).\n',
        focus_areas: [
          {
            slug: 'community-development',
            title: 'Community development',
            url: '2019-20/focus/community-development',
          },
          {
            slug: 'economic-development',
            title: 'Economic development',
            url: '2019-20/focus/economic-development',
          },
          {
            slug: 'general-public-services',
            title: 'General public services',
            url: '2019-20/focus/general-public-services',
          },
        ],
        percentage_of_budget: 5.577493428917811,
        programmes: [
          {
            amount: 275708000.0,
            percentage: 0.30391834844913046,
            slug: 'administration',
            title: 'Administration',
          },
          {
            amount: 4084119000.0,
            percentage: 4.502004661996439,
            slug: 'community-work-programme',
            title: 'Community Work Programme',
          },
          {
            amount: 69370327000.0,
            percentage: 76.46827517959626,
            slug: 'institutional-development',
            title: 'Institutional Development',
          },
          {
            amount: 15259803000.0,
            percentage: 16.821180834140055,
            slug: 'local-government-support-and-intervention-management',
            title: 'Local Government Support And Intervention Management',
          },
          {
            amount: 761231000.0,
            percentage: 0.8391198960794756,
            slug: 'national-disaster-management-centre',
            title: 'National Disaster Management Centre',
          },
          {
            amount: 966599000.0,
            percentage: 1.0655010797386404,
            slug: 'regional-and-urban-development-and-legislative-support',
            title: 'Regional And Urban Development And Legislative Support',
          },
        ],
        slug: 'cooperative-governance-and-traditional-affairs',
        title: 'Cooperative Governance and Traditional Affairs',
        total: 90717787000.0,
      },
    ],
  },
};

const mockApi = new MockAdapter(axios, { delayResponse: 2000 });

const nationalUrls = [
  '/json/2019-20/previews/national/south-africa/original.json',
  '/json/2018-19/previews/national/south-africa/original.json',
  '/json/2017-18/previews/national/south-africa/original.json',
  '/json/2016-17/previews/national/south-africa/original.json',
];

const provincialUrls = [
  '/json/2019-20/previews/provincial/limpopo/original.json',
  '/json/2018-19/previews/provincial/limpopo/original.json',
  '/json/2017-18/previews/provincial/limpopo/original.json',
  '/json/2016-17/previews/provincial/limpopo/original.json',
];

const mockEndpoints = () => {
  nationalUrls.forEach((url, index) => mockApi.onGet(url).reply(200, index === 2 ? {} : valid));
  provincialUrls.forEach((url, index) => mockApi.onGet(url).reply(200, index === 2 ? {} : valid));
};

export default mockEndpoints;
