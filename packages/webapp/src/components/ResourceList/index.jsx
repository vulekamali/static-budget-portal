import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/icons/ArrowDownward';
import Copy from '@material-ui/icons/FileCopy';


const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

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
  padding: 10px;
  width: 100%;
  box-sizing: border-box;

  @media screen and (min-width: 550px) {
    width: ${100 / 2}%;
  }

  @media screen and (min-width: 850px) {
    width: 50%;
  }

  @media screen and (min-width: 1050px) {
    width: ${100 / 4}%;
  }
`;

const CardContentWrapper = styled(CardContent)`
  &&&&{
    padding: 16px;
    display: flex;
    justify-content: space-between;
    @media screen and (min-width: 375px) {
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
    height: 57px;
    text-transform: none;
    box-shadow: none;
    @media screen and (min-width: 375px) {
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

  @media screen and (min-width: 375px) {
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
      <Card>
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
      </Card>
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


const Resources = ({ resources }) => (
  <Wrapper>
    {resources.map(createResource)}
    <CopyCitation />
  </Wrapper>
);


export default Resources;
