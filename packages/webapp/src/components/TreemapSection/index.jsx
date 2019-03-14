import React from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import TreeMap from './Treemap';
import SpeedDial from '../SpeedDial';

const TreemapWrapper = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

const BudgetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
`;

const IconAndDates = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
`;

const BudgetHeading = styled(Typography)`
  border-right: 1px solid #000;

  && {
    font-weight: 700;
    font-size: 32px;
    line-height: 65px;
    color: #000;
    text-transform: Capitalize;
    width: 100%;
    min-width: none;
    padding-bottom: 30px;
  }
`;

const TreeMapSection = ({ eventHandler, selected }) => (
  <TreemapWrapper>
    <BudgetContainer>
      <BudgetHeading>Consolidated Budget Summary</BudgetHeading>
      <IconAndDates>
        <SpeedDial />
        <div>
          <Button onClick={() => console.log('do something')}>2017-18</Button>
        </div>
      </IconAndDates>
    </BudgetContainer>
    <TreeMap event={eventHandler} />
    <p>{JSON.stringify(selected)}</p>
  </TreemapWrapper>
);

export default TreeMapSection;
