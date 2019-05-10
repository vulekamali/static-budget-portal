/* eslint-disable no-console  */

import React from 'react';

/**
 * Imports everything needed to execute this specific test.
 */
import StackChart from '../index';
import { mockProps } from '../schema';


/**
 * Executes test.
 */
const Demo = () => <StackChart {...mockProps(false)} />
export default Demo;
