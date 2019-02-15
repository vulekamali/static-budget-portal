import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import ResourceList from '../../components/ResourceList';


const Wrapper = styled.div`
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
`;


const Resources = ({ resources }) => (
  <Wrapper>
    <Typography>2019 budget resources</Typography>
    <ResourceList {...{ resources }} />
  </Wrapper>
);


export default Resources;
