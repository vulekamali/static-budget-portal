import React, { Fragment } from 'react';
import TopBar from './TopBar';
import Preview from './Preview';


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
      <TopBar {...topBarProps} />
      <Preview {...projects[id]} />
    </Fragment>
  );
};


export default Markup;
