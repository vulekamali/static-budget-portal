import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from './TopBar';
import Preview from './Preview';
import ProjectList from './ProjectList';
import Layout from '../../components/Layout';
// import InfraChart from '../../components/InfraChart';


const Markup = (props) => {
  const {
    id,
    projects,
    nextId,
    details,
    toggleDetails,
    selected,
    points,
  } = props;

  console.log(id)


  const amount = projects.length;

  const topBarProps = {
    id,
    amount,
    details,
    toggleDetails,
    nextId,
  }


  return (
    <Layout>
      <CssBaseline />
      <TopBar {...topBarProps} />

      <Preview {...projects[id]} details={details} selected={id} {...{ points }} />
      {!details && <ProjectList {...{ projects }} />}
      {/* {sdetails && <InfraChart />} */}
    </Layout>
  );
};


export default Markup;
