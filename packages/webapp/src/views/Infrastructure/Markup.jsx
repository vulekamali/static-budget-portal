import React from 'react';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from './TopBar';
import Preview from './Preview';
import ProjectList from './ProjectList';
import Layout from '../../components/Layout';
import InfraChart from '../../components/InfraChart';
import ResourcesList from './ResourcesList';


const ChartWrap = styled.div`
  display: none;

  @media screen and (min-width: 500px) {
    display: block;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px 100px;
  }
`


const Markup = (props) => {
  const {
    id,
    projects,
    nextId,
    details,
    toggleDetails,
    datasetUrl, 
    budgetReviewUrl,
    Link,
    chartData,
  } = props;

  const amount = projects.length;

  const topBarProps = {
    id,
    amount,
    details,
    toggleDetails,
    nextId,
    Link,
  }

  return (
    <Layout>
      <TopBar {...topBarProps} />
      <Preview {...projects[id]} details={details} selected={id} />
      {!details && <ProjectList {...{ projects, datasetUrl, budgetReviewUrl, Link }} />}
      {!!details && projects[id].resources.length > 0 && <ResourcesList resources={projects[id].resources || []} cite />}
      <ChartWrap>
        {!!details && <InfraChart data={projects[id].chartData} />}
      </ChartWrap>
    </Layout>
  );
};


export default Markup;
