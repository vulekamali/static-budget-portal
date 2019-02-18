import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopBar from './TopBar';
import Preview from './Preview';
import ProjectList from './ProjectList';
import InfraChart from '../../components/InfraChart';


const Markup = (props) => {
  const {
    id,
    projects,
    nextId,
    details,
    toggleDetails,
  } = props;


  const amount = projects.length;

  const topBarProps = {
    id,
    amount,
    details,
    toggleDetails,
    nextId,
  }


  return (
    <Fragment>
      <CssBaseline />
      <TopBar {...topBarProps} />
      <Preview {...projects[id]} />
      {!details && <ProjectList {...{ projects }} />}
      {details && <InfraChart />}
    </Fragment>
  );
};


export default Markup;