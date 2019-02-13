import React, { Fragment } from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import { Typography } from '@material-ui/core';
import Buttons from './Buttons';
import Resources from './Resources';
import NotificationBar from './NotificationBar';
import parliamentImg from './parliament-building-budget-speech.jpg';
import womanImg from './woman-smiling-budget-data.jpg';

const imageChange = (image) => {
  switch (image) {
    case ('parliament'): return parliamentImg;
    case ('woman'): return womanImg;
    default: return parliamentImg;
  }
};

const createImageTag = image => styled.div`
  background-image: url('${imageChange(image)}');
  background-size: cover;
  background-position: center;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SubHeading = styled(Typography)`
  && {
    font-size: 10px;
    color: #fff;
    text-transform: uppercase;

    @media screen and (min-width: 400px) {
      font-size: 14px;
    }

    @media screen and (min-width: 650px) {
      font-size: 18px;
    }
  }
`;

const Heading = styled(Typography)`
  && {
    font-size: 18px;
    color: #fff;
    letter-spacing: 3px;
    font-weight: bold;
    padding-bottom: 24px;
    font-family: Lato;
    width: 90%;
    padding-bottom: 15px;
    line-height: 36px;
    font-size: 28px;
    text-align: center;

    @media screen and (min-width: 850px) {
      padding-bottom: 15px;
    }

    @media screen and (min-width: 650px) {
      font-size: 40px;
    }
  }
`;

const ExampleView = (props) => {
  const {
    buttons,
    heading,
    subheading,
    notice,
    resources,
    image,
    callToAction,
  } = props;

  const Image = createImageTag(image);

  return (
    <Fragment>
      <Image>
        <SubHeading>{subheading}</SubHeading>
        <Heading>{heading}</Heading>
        <Buttons primary={buttons.primary} secondary={buttons.secondary} />
      </Image>
      <NotificationBar {...{ notice, callToAction }} />
      {resources && <Resources {...{ resources }} />}
    </Fragment>
  );
};


export default ExampleView;


ExampleView.propTypes = {
  /** The heading text to use over the image */
  heading: t.string.isRequired,
  /** The smaller subheading text to user above the heading */
  subheading: t.string.isRequired,
  /** A single line of text to show as a notice just below image */
  notice: t.string,
  /** The image to use as the background for the hero section */
  image: t.string.isRequired,
  /** A primary and secondary button to display over the image */
  buttons: t.shape({
    primary: t.shape({
      text: t.string,
      link: t.string,
    }),
    secondary: t.shape({
      text: t.string,
      link: t.string,
    }),
  }).isRequired,
  /** A list of resources associated with this year's budget cycle */
  resources: t.arrayOf(t.shape({
    title: t.string,
    size: t.string,
    format: t.string,
    link: t.string,
  })),
  /** A main call-to-action card that goes below the image and above the 'notice' line of text  */
  callToAction: t.shape({
    heading: t.string,
    subheading: t.string,
    button: t.shape({
      text: t.string,
      link: t.string,
    }),
  }),
};


ExampleView.defaultProps = {
  notice: null,
  resources: null,
  callToAction: null,
};
