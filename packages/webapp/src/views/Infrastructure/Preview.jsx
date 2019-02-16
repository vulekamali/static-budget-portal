import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import { calcProgress, trimValues } from './helpers';
import LinearProgress from '@material-ui/core/LinearProgress';


const AnimationWrapper = posed.div({
  enter: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: '100vw',
  }
});


const createItem = (props) => {
  const {
    subheading,
    heading,
    stage,
    totalBudget,
    projectedBudget,
    description,
    id,
  } = props;

  return (
    <AnimationWrapper key={id}>
      <ul>
        <li>{heading}</li>
        <li>{subheading}</li>
        <li>{stage}</li>
        {calcProgress(stage) && <li><LinearProgress variant="determinate" value={calcProgress(stage)} /></li>}
        <li>Total budget</li>
        <li>{`R${trimValues(totalBudget)}`}</li>
        <li>3 Years project budget</li>
        <li>{`R${trimValues(projectedBudget)}`}</li>
        <li>{description}</li>
      </ul>
    </AnimationWrapper>
  )
}


const Preview = (props) => {
  return (
    <PoseGroup>
      {createItem(props)}
    </PoseGroup>
  );
}


export default Preview;
