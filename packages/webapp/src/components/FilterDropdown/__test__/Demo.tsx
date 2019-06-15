import React from 'react';
import { boolean, button, text, object } from '@storybook/addon-knobs';
import { Tprops, mockProps } from '../schema';
import FilterDropdown from '../';

const { loading, options, primary, onSelectedChange, initialSelected }: Tprops = mockProps();

const Demo = () => (
  <FilterDropdown
    loading={boolean('loading', loading)}
    options={object('options', options)}
    primary={boolean('primary', primary)}
    initialSelected={text('initialSelected', initialSelected)}
    {...{ onSelectedChange }}
  />
);

export default Demo;
