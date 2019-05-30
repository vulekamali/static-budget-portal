import React from 'react';
import { text, object } from '@storybook/addon-knobs';
import { Tprops, mockProps } from '../schema';
import FilterDropdown from '../';

const { title, button, selectionDropdown, yearDropdown }: Tprops = mockProps();

const Demo = () => (
  <FilterDropdown
    title={text('title', title)}
    selectionDropdown={object('selectionDropdown', selectionDropdown)}
    yearDropdown={object('yearDropdown', yearDropdown)}
    button={text('button', button)}
  />
);

export default Demo;
