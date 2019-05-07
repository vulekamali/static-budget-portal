import {
  Typography,
  Select,
} from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  margin-left: 16px;
  margin-bottom: 20px;

  @media screen and (min-width: 950px) {
    margin-bottom: 40px;
  }
`;

const ResourcesContainer = styled.div`
  max-width: 1200px;
  padding-bottom: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 950px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 24px;
  }
`;


export {
  Wrapper,
  ResourcesContainer
}

export default {
  Wrapper,
  ResourcesContainer
}
