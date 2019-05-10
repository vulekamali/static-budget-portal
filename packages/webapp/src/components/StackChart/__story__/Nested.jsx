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
const Nested = () => <StackChart {...mockProps(true)} />
export default Nested;
