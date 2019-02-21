import { createElement } from 'react';
import { render } from 'react-dom';
import Homepage from '../views/Homepage';


const props = {
  image: 'https://via.placeholder.com/150',
  heading: 'New budget data will go live soon',
  subheading: 'The 2019 budget speech has commenced',
  buttons: {
    primary: {
      text: 'Watch the speech',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/webcast.aspx'
    },
    secondary: {
      text: 'Download budget resources',
      link: '#',
    },
  },
  callToAction: {    
    subheading: 'Budget feature',    
    heading: 'The Status of National Department Infrastructure Projects in South Africa',    
    link: {    
      text: 'Read this feature',    
      link: 'https://vulekamali.gov.za/infrastructure-projects',    
    },    
  },
  notice: 'The 2019/20 budget will be live on Vulekamali by 22 February 2019.',
  resources: [
    {
      heading: 'Budget Speech',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/speech/speech.pdf',
    },
    {
      heading: 'Budget Review',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/review/FullBR.pdf',
    },
    {
      heading: 'Budget Revenue Data',
      size: null,
      format: 'XLSX',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/TimeSeries/Excel/Table%202%20-%20Main%20budget%20estimates%20of%20national%20revenue.xlsx',
    },
    {
      heading: 'Estimates National Expenditure',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/ene/FullENE.pdf',
    },
    {
      heading: 'Estimates National Expenditure Data',
      size: null,
      format: 'ZIP',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/ene/ENE%20Summary%20Tables.zip',
    },
    {
      heading: 'Division Revenue Bill',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/legislation/bills/2019/[B5-2019]%20Division%20of%20Revenue.pdf',
    },
    {
      heading: 'Highlights',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/sars/Budget%202019%20Highlights.pdf',
    },
    {
      heading: 'Appropriation',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/legislation/bills/2019/[B6-2019]%20Appropriation.pdf',
    },
    {
      heading: 'Pocket Guide',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/sars/Budget%202019%20Tax%20Guide.pdf',
    },
    {
      heading: 'People Guide (Afrikaans)',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/guides/2019%20Peoples%20Guide%20Afrikaans.pdf',
    },
    {
      heading: 'People Guide (English)',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/guides/2019%20Peoples%20Guide%20English.pdf',
    },
    {
      heading: 'People Guide (Setswana)',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/guides/2019%20Peoples%20Guide%20Setswana.pdf',
    },
    {
      heading: 'People Guide (Xhosa)',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/guides/2019%20Peoples%20Guide%20Xhosa.pdf',
    },
    {
      heading: 'People Guide (Zulu)',
      size: null,
      format: 'PDF',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/guides/2019%20Peoples%20Guide%20Zulu.pdf',
    },
    {
      heading: 'Resources Link',
      size: null,
      format: 'Web',
      link: 'http://www.treasury.gov.za/documents/national%20budget/2019/default.aspx',
    },
  ],
};

const node = document.querySelector('[data-webapp="homepage-hero"]')

const connection = () => {
  if (node) {
    render(createElement(Homepage, props), node);
  }
};

export default connection();
