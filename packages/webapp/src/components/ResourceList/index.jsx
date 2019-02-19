import React from 'react';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import Icon from '@material-ui/icons/ArrowDownward';
import Copy from '@material-ui/icons/FileCopy';


const Title = styled(Typography)`
  && {
    width: 173px;
    height: 39px;
    left: 289px;
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
  margin: 10px;
  width: 272px;
  box-sizing: border-box;
  height: 90px;

  @media screen and (min-width: 550px) {
    // width: ${100 / 2}%;
    height: auto;
  }

  @media screen and (min-width: 850px) {
    width: 250px;
  }

  @media screen and (min-width: 1028px) {
    width: 225px;
    &&:first-child{
      margin-left: 0;
    }
    
    &&:nth-child(4) {
      margin-right: 0;
    }
    
    &&:nth-child(4n + 1) {
      margin-left: 0;
    }
  }
`;

const StyledCard = styled(Card)`
   && {
    width: 272px;
    @media screen and (min-width: 650px) {
      display: flex;
      width: 225px;
      height: 138px;
    }
   }
`;

const CardContentWrapper = styled(CardContent)`
  &&&&{
    padding: 16px;
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 550px) {
      display: flex;
      flex-direction: column;
    }
  }
`;

const HeadingText = styled.div`
  &&&& {
    line-height: 23px;
    font-size: 16px;
  }
`;

const BtnLink = styled.a`
  text-decoration: none;
`;

const ButtonBtn = styled(Button)`
  && {
    padding: 6px;
    min-width: 0px;
    width: 40px;
    height: 57px;
    text-transform: none;
    box-shadow: none;
    @media screen and (min-width: 550px) {
      padding: 6px 16px;
      display: flex;
      justify-content: space-between;
      min-width: 193px;
      height: 32px;
    }
  }
`;

const SpanText = styled.span`
  display: none;
  font-size: 12px;
  @media screen and (min-width: 550px) {
    display: flex;
    justify-content: flex-start;
  }
`;

const CardBlack = styled(Card)`
  &&{ 
    background-color: #3F3F3F;
    height: 149px;
  }
`;

const TitleBlack = styled(Title)`
  && {
    color: #ffffff;
    height: 16px;
    margin-bottom: 16px;
  }
`;

const SubHeading = styled(Size)`
   && {
      color: #ffffff;
   }
`;

const ButtonBtnBlack = styled(ButtonBtn)`
  && {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const iconSize = {
  height:'16px',
  width: '16px',
}

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
          <div>
            <BtnLink href={link}>
              <ButtonBtn variant="contained">
                <SpanText>Download</SpanText>
                <Icon style={iconSize} />
              </ButtonBtn>
              </BtnLink>
          </div>
        </CardContentWrapper>
      </StyledCard>
    </CardWrapper>
  );
};

const CopyCitation = () => {
  return (
    <CardWrapper>
      <CardBlack>
        <CardContentWrapper>
          <HeadingText>
            <TitleBlack>How to cite this data</TitleBlack>
            <SubHeading>(South African National Treasury Infrastructure Report 2019 - Standerton Correctional Centre)</SubHeading>
          </HeadingText>
          <div>
            <BtnLink href="#">
              <ButtonBtnBlack variant="contained">
                <SpanText>Copy to clipboard</SpanText>
                <Copy style={iconSize} />
              </ButtonBtnBlack>
            </BtnLink>
          </div>
        </CardContentWrapper>
      </CardBlack>
    </CardWrapper>
  )
};

const Wrapper = styled.div`
  background: #EDEDED;
  padding: 45px 0px 40px;
`;

const Content = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const MainTitle = styled.h2`
   font-family: Lato;
   font-size: 10px;
   letter-spacing: 3px;
   text-align: center;
   text-transform: uppercase;
   padding: 0 16px;
   @media screen and (min-width: 550px) {
    text-align: left;
    letter-spacing: 2px;
    font-size: 14px;
  }
   @media screen and (min-width: 1028px) {
    padding: 0;
   }
`;

const List = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  @media screen and (min-width: 850px) {
    justify-content: flex-start;
  }
`;

const Resources = ({ resources }) => (
  <Wrapper>
    <Content>
      <MainTitle>Project Resources</MainTitle>
      <List>
        {resources.map(createResource)}
        <CopyCitation />
      </List>
    </Content>
  </Wrapper>
);


export default Resources;
