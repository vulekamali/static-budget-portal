import React from 'react';
import styled from 'styled-components';

import CustomizedDateSelect from './CustomizedDateSelect';
import CustomizedSelect from './CustomizedSelect';

import { Typography, Button } from '@material-ui/core';

import Arrow from './Arrow.svg';

const Title = styled(Typography)`
  && {
    font-weight: 700;
    letter-spacing: 0.01rem;
  }
`;

const HeadingWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: #f7f7f7;

  @media screen and (min-width: 600px) {
    max-width: 100%;
  }
`;

const HeadingContentWrapper = styled.div`
  &&&& {
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 675px) {
      width: auto;
      flex-direction: column;
    }
  }
`;

const HeadingText = styled.div`
  &&&& {
    line-height: 23px;
    font-size: 16px;
    width: 60%;

    @media screen and (max-width: 675px){
      display: block;
      width: 100%;
    }
  }
`;

const TitleBlack = styled(Title)`
  && {
    color: #000;
    font-size: 48px;
    padding-top: 30px;

    @media screen and (max-width: 675px){
      font-size: 32px;
    }
  }
`;


const RightColumn = styled.div`
  margin-top: 99px;
  width: 40%;
  display: flex;

  @media screen and (max-width: 675px){
    width: 100%;
    margin-top: 0;
  }
`;


const ButtonDetails = styled(Button)`
  && {
    display: block;
    text-align: left;
    font-weight: bold;
    font-size: 20px;
    background: black;
    color: white;
    width: 62%;
    height: 64px;
    line-height: 22px;
    margin-top: 29px;
    text-transform: capitalize;
    letter-spacing: 0.01em;
    padding-left: 25px;
    border-radius: 2px;

    @media screen and (max-width: 675px){
      font-size: 14px;
      height: 42px;
      padding-left: 15px;
      line-height: 13px;
      margin-top: 2px;
    }
  }
`;

const ArrowImage = styled.img`
  position: absolute;
  right: 25px;
  top: 24px;

  @media screen and (max-width: 675px){
    right: 15px;
    top: 15px;
    height: 12px;
  }
`;


const Heading = () => (
  <HeadingWrapper>
    <HeadingContentWrapper>
      <HeadingText>
        <TitleBlack>
          National Budget
        </TitleBlack>
        <CustomizedSelect />
      </HeadingText>
      <RightColumn>
        <CustomizedDateSelect />
        <ButtonDetails>
          Detailed analysis
          <ArrowImage src={Arrow} alt="Arrow" />
        </ButtonDetails>
      </RightColumn>
    </HeadingContentWrapper>
  </HeadingWrapper>
);


export default Heading;
