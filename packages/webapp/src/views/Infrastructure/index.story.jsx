import React from 'react';
import { storiesOf } from '@storybook/react';
import Infrastructure from './index';


const projects = [
  {
    id: 1,
    subheading: '111111',
    heading: 'aassg adfgh',
    stage: 'Pre-feasibility',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Eastern Cape',
  },
  {
    id: 2,
    subheading: '222222',
    heading: 'aassg adfgh',
    stage: 'Construction',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Mpumalanga',
  },
  {
    id: 'aa',
    subheading: '222222',
    heading: 'aassg adfgh',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Multiple',
  },
  {
    id: 3,
    subheading: '33333',
    heading: 'aassg adfgh',
    stage: 'Complete',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Northern Cape',
  },
  {
    id: 4,
    subheading: '444444',
    heading: 'asdgdhs',
    stage: 'Tender',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Western Cape',
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
  },
  {
    id: '2aa',
    subheading: '222222',
    heading: 'aassg adfgh',
    totalBudget: 124555000111,
    projectedBudget: 2342342,
    description: 'Cupidatat nostrud esse dolore voluptate nulla dolore cillum aliqua duis est nostrud in dolor magna. Ad occaecat sit magna fugiat cupidatat adipisicing in. Dolor amet minim ut ullamco ullamco occaecat ullamco nostrud voluptate nisi ex aliquip irure. Tempor cillum anim in in pariatur id anim ut do proident amet. Magna proident cillum do esse sunt minim voluptate quis amet cupidatat commodo.',
    province: 'Multiple',
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
  }
]


const detailsFalse = () => <Infrastructure {...{ projects }} />;
const detailsTrue = () => <Infrastructure {...{ projects }} details />;


storiesOf('view.Infrastructure', module)
  .add('Details False', detailsFalse)
  .add('Details True', detailsTrue);
