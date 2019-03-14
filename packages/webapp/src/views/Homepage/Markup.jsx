import React, { Fragment } from 'react';
import styled from 'styled-components';
import t from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Typography } from '@material-ui/core';
import Buttons from './Buttons';
import Resources from './Resources';
import NotificationBar from './NotificationBar';
import parliamentImg from './parliament-building-budget-speech.jpg';
import Modal from './Modal';
import Layout from '../../components/Layout';
import TreemapSection from '../../components/TreemapSection';
import SpeedDial from '../../components/SpeedDial';



const Image = styled.div`
  background-image: url('${parliamentImg}');
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
    padding-top: 70px;
    font-size: 10px;
    color: #fff;
    text-transform: uppercase;
    padding-bottom: 5px;
    letter-spacing: 3px;
    font-family: Lato;
    text-align: center;

    @supports (display: flex) {
      padding-top: 0;
    }

    @media screen and (min-width: 650px) {
      font-size: 14px;
    }
  }
`;


const Heading = styled(Typography)`
  && {
    color: #fff;
    font-weight: 700;
    font-family: Lato;
    width: 90%;
    padding-bottom: 33px;
    line-height: 1;
    font-size: 28px;
    text-align: center;

    @media screen and (min-width: 650px) {
      font-size: 48px;
    }
  }
`;

const TreemapWrapper = styled.div`
  margin: 0 auto;
  max-width: 1000px;
`;

const BudgetContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  margin-bottom: 30px;
`;

const IconAndDates = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
`;

const BudgetHeading = styled(Typography)`
  border-right: 1px solid #000;

  && {
    font-weight: 700;
    font-size: 32px;
    line-height: 65px;
    color: #000;
    text-transform: Capitalize;
    width: 100%;
    min-width: none;
    padding-bottom: 30px;
  }
`;


const Markup = (props) => {
  const {
    buttons: buttonsRaw,
    heading,
    subheading,
    notice,
    resources,
    image,
    callToAction,
    modal,
    closeModal,
    openModal,
    videoUrl,
    eventHandler,
    selected,
  } = props;

  const buttons = {
    ...buttonsRaw,
    primary: {
      ...buttonsRaw.primary,
      clickEvent: openModal,
    },
  }
  return (
    <Layout>
      <Modal {...{ closeModal, videoUrl }} open={!!modal} />
      <Image>
        <SubHeading>{subheading}</SubHeading>
        <Heading>{heading}</Heading>
        <Buttons primary={buttons.primary} secondary={buttons.secondary} />
      </Image>
      <NotificationBar {...{ notice, callToAction }} />
      {resources && <Resources {...{ resources }} />}

      <TreemapSection />

    </Layout>
  );
};


export default Markup;


Markup.propTypes = {
  heading: t.string.isRequired,
  subheading: t.string.isRequired,
  notice: t.string,
  videoUrl: t.string,
  image: t.string.isRequired,
  openModal: t.func.isRequired,
  closeModal: t.func.isRequired,
  modal: t.bool,
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
  resources: t.arrayOf(t.shape({
    title: t.string,
    size: t.string,
    format: t.string,
    link: t.string,
  })),
  callToAction: t.shape({
    heading: t.string,
    subheading: t.string,
    button: t.shape({
      text: t.string,
      link: t.string,
    }),
  }),
};


Markup.defaultProps = {
  notice: null,
  resources: null,
  callToAction: null,
  videoUrl: null,
  modal: false,
};
