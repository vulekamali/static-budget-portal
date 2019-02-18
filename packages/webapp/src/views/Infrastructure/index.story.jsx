import React from 'react';
import { storiesOf } from '@storybook/react';
import Infrastructure from './index';


const projects = [
  {
    id: 1,
    subheading: 'Correctional services',
    heading: 'Standerton Correctional Centre',
    stage: 'Construction',
    totalBudget: 124255000111,
    projectedBudget: 51823429,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lobortis, tellus accumsan lobortis imperdiet, justo orci venenatis velit, at feugiat nibh ligula sit amet mi.',
    province: 'Eastern Cape',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 2,
    subheading: 'Correctional services',
    heading: 'aassg adfgh',
    stage: 'Construction',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Mpumalanga',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 'aa',
    subheading: 'Correctional services',
    heading: 'aassg adfgh',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Multiple',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 3,
    subheading: 'Correctional services',
    heading: 'aassg adfgh',
    stage: 'Complete',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Northern Cape',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 4,
    subheading: 'Correctional services',
    heading: 'asdgdhs',
    stage: 'Tender',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Western Cape',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 5,
    subheading: '555555',
    heading: 'aassg adfgh',
    stage: 'Site identification',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Gauteng',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 21,
    subheading: '111111',
    heading: 'aassg adfgh',
    stage: 'Pre-feasibility',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Eastern Cape',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 22,
    subheading: '222222',
    heading: 'aassg adfgh',
    stage: 'Construction',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Mpumalanga',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: '2aa',
    subheading: '222222',
    heading: 'aassg adfgh',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Multiple',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 23,
    subheading: '33333',
    heading: 'aassg adfgh',
    stage: 'Complete',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Northern Cape',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 24,
    subheading: '444444',
    heading: 'asdgdhs',
    stage: 'Tender',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Western Cape',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  },
  {
    id: 25,
    subheading: '555555',
    heading: 'aassg adfgh',
    stage: 'Site identification',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Gauteng',
    link: '#',
    sideInfo: {
      investment: 'New infrastructure',
      infrastructure: 'Correctional facility',
      department: 'Correctional services',
    },
  }
]


const detailsFalse = () => <Infrastructure {...{ projects }} />;
const detailsTrue = () => <Infrastructure {...{ projects }} details />;


storiesOf('view.Infrastructure', module)
  .add('Details False', detailsFalse)
  .add('Details True', detailsTrue);
