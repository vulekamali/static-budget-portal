import React from 'react';
import { storiesOf } from '@storybook/react';
import ResourceList from './index';

const resources = [
  {
    heading: 'Example 1 A',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 1'),
  },
  {
    heading: 'Example 2 A',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 2'),
  },
  {
    heading: 'Example 3 A',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 3'),
  },
  {
    heading: 'Example 4 A',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 4'),
  },
  {
    heading: 'Example 1',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 1'),
  },
  {
    heading: 'Example 2 B',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 2'),
  },
  {
    heading: 'Example 3 B',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 3'),
  },
  {
    heading: 'Example 4 B',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 4'),
  },
  {
    heading: 'Example 1 C',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 1'),
  },
  {
    heading: 'Example 2 C',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 2'),
  },
  {
    heading: 'Example 3 C',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 3'),
  },
  {
    heading: 'Example 4 C',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 4'),
  },
  {
    heading: 'Example 1 D',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 1'),
  },
  {
    heading: 'Example 2 D',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 2'),
  },
  {
    heading: 'Example 3 D',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 3'),
  },
  {
    heading: 'Example 4 D',
    size: '3.3MB',
    format: 'PDF',
    action: () => console.log('Example 4'),
  }
]

const basic = () => <ResourceList {...{ resources }} />;


storiesOf('component.ResourceList', module)
  .add('Default', basic)
