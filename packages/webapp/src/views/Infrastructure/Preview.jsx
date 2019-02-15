import React from 'react';
import posed, { PoseGroup } from 'react-pose';


const AnimationWrapper = posed.div({
  enter: {
    opacity: 1,
    x: ({ reverse }) => (reverse ? '-50vw' : 0),
  },
  exit: {
    opacity: 0,
    x: ({ reverse }) => (reverse ? 0 : '50vw')
  }
})

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
        <li>{totalBudget}</li>
        <li>{projectedBudget}</li>
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
