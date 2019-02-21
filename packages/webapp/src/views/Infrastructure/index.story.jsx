import React from 'react';
import { storiesOf } from '@storybook/react';
import Infrastructure from './index';


const props = {
  points: [
    {
      id: 'Cape Town',
      x: 18.468361,
      y: -33.920175,
    },
    {
      id: 'Pretoria',
      x: 28.198471,
      y: -25.739050,
    },
    {
      id: 'Cape Town1',
      x: 18.968361,
      y: -33.020175,
    },
    {
      id: 'Pretoria1',
      x: 28.998471,
      y: -25.039050,
    },
    {
      id: 'Port Elizabeth1',
      x: 25.920117,
      y: -33.054467
    },
    {
      id: 'Port Elizabeth',
      x: 25.620117,
      y: -33.954467
    },
    {
      id: 'Border Crossing1',
      x: 29.983063,
      y: -22.228865,
    },
    {
      id: 'Border Crossing',
      x: 20.983063,
      y: -22.228865,
    },
    {
      id: 'Cape Townb',
      x: 19.468361,
      y: -32.920175,
    },
    {
      id: 'Pretoriab',
      x: 27.198471,
      y: -24.739050,
    },
    {
      id: 'Cape Town1b',
      x: 17.968361,
      y: -32.020175,
    },
    {
      id: 'Pretoria1b',
      x: 27.998471,
      y: -24.039050,
    },
    {
      id: 'Port Elizabeth1b',
      x: 24.920117,
      y: -32.054467
    },
    {
      id: 'Port Elizabethb',
      x: 24.620117,
      y: -32.954467
    },
    {
      id: 'Border Crossing1b',
      x: 28.983063,
      y: -21.228865,
    },
    {
      id: 'Border Crossingb',
      x: 21.983063,
      y: -21.228865,
    }
  ],
  projects: [
    {
      id: '1',
      subheading: 'Correctional services',
      heading: 'Standerton Correctional Centre',
      points: ['Cape Town1', 'Pretoria1'],
      activeProvinces: ['Western Cape', 'Gauteng'],
      stage: 'Construction',
      totalBudget: 124255000111,
      projectedBudget: 51823429,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis, tellus accumsan lobortis imperdiet, justo orci venenatis velit, at feugiat nibh ligula sit amet mi.',
      province: 'Eastern Cape',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: 'aaa',
      subheading: 'Water & Sanitation',
      heading: 'Vaal Gamagara bulk water supply',
      stage: 'Construction',
      points: ['Border Crossing'],
      activeProvinces: ['Limpopo'],
      totalBudget: 124555000111,
      projectedBudget: 2342342,
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Mpumalanga',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 4739,
        },
        {
         name: '2016',
         Actual: 5899,
        },
        {
         name: '2017',
         Actual: 1000,
         Connection: 1000,
        },
        {
         name: '2018',
         Actual: 890,
         Connection: 890,
        },
        {
         name: '2019',
         Projected: 3271,
        },
        {
         name: '2020',
         Projected: 4720,
        },
        {
         name: '2021',
         Projected: 8908,
        },
        {
         name: '2020',
         Projected: 9203,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '3',
      subheading: 'Health',
      heading: 'Elim Hospital',
      totalBudget: 124555000111,
      stage: 'Construction',
      projectedBudget: 2342342,
      points: ['Cape Town', 'Pretoria'],
      activeProvinces: ['Western Cape', 'Gauteng'],
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Multiple',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '4',
      subheading: 'Correctional services',
      heading: 'aassg adfgh',
      stage: 'Complete',
      points: ['Port Elizabeth1'],
      activeProvinces: ['Eastern Cape'],
      totalBudget: 124555000111,
      projectedBudget: 2342342,
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Northern Cape',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '5',
      subheading: 'Correctional services',
      heading: 'asdgdhs',
      stage: 'Tender',
      points: ['Border Crossing1'],
      activeProvinces: ['Limpopo'],
      totalBudget: 124555000111,
      projectedBudget: 2342342,
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Western Cape',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '6',
      subheading: '555555',
      heading: 'aassg adfgh',
      stage: 'Site identification',
      points: ['Port Elizabeth'],
      activeProvinces: ['Eastern Cape'],
      totalBudget: 124555000111,
      projectedBudget: 2342342,
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Gauteng',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '7',
      subheading: 'Correctional services',
      heading: 'Standerton Correctional Centre',
      points: ['Cape Town1b', 'Pretoria1b'],
      activeProvinces: ['Western Cape', 'Gauteng'],
      stage: 'Construction',
      totalBudget: 124255000111,
      projectedBudget: 51823429,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis, tellus accumsan lobortis imperdiet, justo orci venenatis velit, at feugiat nibh ligula sit amet mi.',
      province: 'Eastern Cape',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '25',
      subheading: '222222',
      heading: 'aassg adfgh',
      stage: 'Construction',
      points: ['Border Crossingb'],
      activeProvinces: ['Limpopo'],
      totalBudget: 124555000111,
      projectedBudget: 2342342,
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Mpumalanga',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: 'aaaa',
      subheading: '333333',
      heading: 'aassg adfgh',
      totalBudget: 124555000111,
      stage: 'Construction',
      projectedBudget: 2342342,
      points: ['Cape Townb', 'Pretoriab'],
      activeProvinces: ['Western Cape', 'Gauteng'],
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Multiple',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '35',
      subheading: '33333',
      heading: 'aassg adfgh',
      stage: 'Complete',
      points: ['Port Elizabeth1b'],
      activeProvinces: ['Eastern Cape'],
      totalBudget: 124555000111,
      projectedBudget: 2342342,
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Northern Cape',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '45',
      subheading: '444444',
      heading: 'asdgdhs',
      stage: 'Tender',
      points: ['Border Crossing1b'],
      activeProvinces: ['Limpopo'],
      totalBudget: 124555000111,
      projectedBudget: 2342342,
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Western Cape',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    },
    {
      id: '55',
      subheading: '555555',
      heading: 'aassg adfgh',
      stage: 'Site identification',
      points: ['Port Elizabethb'],
      activeProvinces: ['Eastern Cape'],
      totalBudget: 124555000111,
      projectedBudget: 2342342,
      description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
      province: 'Gauteng',
      link: '#',
      resources: [],
      chartData: [
        {
         name: '2015',
         Actual: 1023,
        },
        {
         name: '2016',
         Actual: 1142,
        },
        {
         name: '2017',
         Actual: 911,
         Connection: 911,
        },
        {
         name: '2018',
         Actual: 1052,
         Connection: 1052,
        },
        {
         name: '2019',
         Projected: 1047,
        },
        {
         name: '2020',
         Projected: 1133,
        },
        {
         name: '2021',
         Projected: 9021,
        },
        {
         name: '2020',
         Projected: 1017,
        },
      ],
      sideInfo: {
        investment: 'New infrastructure',
        infrastructure: 'Correctional facility',
        department: {
          name: 'Correctional services',
          url: '#'
        }
      },
    }
  ]
}


const detailsFalse = () => <Infrastructure {...props} />;
const detailsTrue = () => <Infrastructure {...props} details />;


storiesOf('view.Infrastructure', module)
  .add('Details False', detailsFalse)
  .add('Details True', detailsTrue);
