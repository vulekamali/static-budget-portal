import React from 'react';
import ResourceList from '../../components/ResourceList';
import Layout from '../../components/Layout';

import { Wrapper, ResourcesContainer } from './styled';

const Resources = ({ resources }) => (
  <Wrapper>
    <ResourcesContainer>
    <Layout>
      <ResourceList {...{ resources }} />
    </Layout>
    </ResourcesContainer>
  </Wrapper>
);

export default Resources;
