import React from 'react';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import Icon from '@material-ui/icons/ArrowDownward';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  border: 2px solid red;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    border: 2px solid yellow;
  }

  @media screen and (min-width: 1024px) {
    max-width: 965px;
  }
`;

const Title = styled(Typography)`
  && {
    width: 100%;
    height: 39px;
    font-family: Lato;
    top: 768px;
    line-height: 23px;
    font-size: 14px;
    color: #000000;
  }
`;

const Size = styled(Typography)`
  && {
    color: grey;
    margin: 4.5% 0;
    font-size: 10px;
    letter-spacing: 0.5px;
  }
`;

const CardWrapper = styled.div`
    display: flex;
    padding: 2px;
    width: 272px;
    margin: 0 auto;
    box-sizing: border-box;
    border: 1px solid blue;

  @media screen and (min-width: 768px) {
    justify-content: space-around;
    max-width: 225px;
    width: ${100 / 2}%;
  }
  @media screen and (min-width: 1024px) {
    width: ${100 / 4}%;
  }
`;

const StyledCard = styled(Card)`
   && {
    width: 100%;

    @media screen and (min-width: 768px) {
      display: flex;
      width: 225px;
      height: 138px;
    }
   }
`;

const CardContentWrapper = styled(CardContent)`
    display: flex;
    justify-content: space-between;
    height: 100%;

  @media screen and (min-width: 768px) {
    && {
    display: flex; //no need for this here since you already applied style above.
    flex-direction: column;
    justify-content: space-between;
    }
  }
`;

const HeadingText = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  line-height: 23px;
  font-size: 16px;
`;

const BtnLink = styled.a`
  text-decoration: none;
`;

const ButtonBtn = styled(Button)`
  && {
    display: flex;
    min-width: 0px;
    width: 40px;
    height: 58px;
    border-style: solid;
  }

  @media screen and (min-width: 768px) {
    && {
    display: flex;
    align-self: flex-start;
    margin-top: 72px;
    margin-left: 2px;
    height: 38px;
    width: 90%;
    }
`;

const SpanText = styled.span`
  display: none;
  padding: 16px;

  @media screen and (min-width: 768px) {
    && {
    display: flex;
    align-items: baseline;
    margin-left: 1px;
    margin-right: 40px;
    justify-content: space-between;
    padding-top: 4px;
    text-transform: capitalize;
    }
`;

const createResource = (props) => {
  const {
    heading,
    size,
    format,
    link,
  } = props;

  return (
    <CardWrapper key={heading}>
      <CssBaseline />
      <StyledCard>
        <CardContentWrapper>
          <HeadingText>
              <Title>{heading}</Title>
               <Size>{size} - {format}</Size>
          </HeadingText>
          <BtnLink href={link}>
            <ButtonBtn variant="contained">
              <SpanText>Download</SpanText>
              <Icon />
            </ButtonBtn>
          </BtnLink>
        </CardContentWrapper>
      </StyledCard>
    </CardWrapper>
  );
};


const Resources = ({ resources }) => (
  <Wrapper>
    {resources.map(createResource)}
  </Wrapper>
);


export default Resources;
