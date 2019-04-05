import React from 'react';
import styled from 'styled-components';

import CustomizedDateSelect from './CustomizedDateSelect';
import CustomizedSelect from './CustomizedSelect';

import { Typography, Button } from '@material-ui/core';

import Arrow from './Arrow.svg';

const HeadingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  margin-left: 16px;
  background: #f7f7f7;
`;

const HeadingContainer = styled.div`
  width: 100%;
  max-width: 1375px;
  margin-right: 16px;
  margin-left: 16px;
  box-sizing: border-box;
  background: #f7f7f7;
`;

const HeadingText = styled.div`
  width: 100%;
`;

const Title = styled(Typography)`
  && {
    font-size: 32px;
    font-weight: 700;
    line-height: 120%;
    color: #000;

    @media screen and (min-width: 600px) {
      font-size: 48px;
    }
  }
`;

const SelectsGroup = styled.div`
  display: flex;
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

    @media screen and (max-width: 675px) {
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

  @media screen and (max-width: 675px) {
    right: 15px;
    top: 15px;
    height: 12px;
  }
`;


const Heading = () => (
  <HeadingWrapper>
    <HeadingContainer>
      <HeadingText>
        <Title>National Budget</Title>
      </HeadingText>
      <SelectsGroup>
      <CustomizedSelect />
        <CustomizedDateSelect />
        <ButtonDetails>
          Detailed analysis
          <ArrowImage src={Arrow} alt="Arrow" />
        </ButtonDetails>
      </SelectsGroup>
    </HeadingContainer>
  </HeadingWrapper>
);


export default Heading;
