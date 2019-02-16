import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/icons/ArrowDownward';


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
    top: 768px;
    font-weight: bold;
    line-height: 23px;
    font-size: 16px;
    color: #000000;
  }
`;

const Size = styled(Typography)`
  && {
    color: grey;
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
  display: flex;
  justify-content: space-between;
  @media screen and (min-width: 375px) {
    display: flex;
    flex-direction: column;
  }
`;

const HeadingText = styled.div`
  // &&&& {
  //   width: 173px;
  //   height: 39px;
  //   left: 289px;
  //   top: 768px;
  //   font-weight: bold;
  //   line-height: 23px;
  //   font-size: 16px;
  //   color: #000000;
  // }

`;

const BtnLink = styled.a`
  text-decoration: none;
`;

const ButtonBtn = styled(Button)`
  && {
    padding: 6px;
    min-width: 0px;
    height: 57px;
  }

  @media screen and (min-width: 375px) {
    && {
      display: flex;
      justify-content: space-between;
      width: 90%;
      height: 40px;
      margin-top: 40px;
    }
  }
`;

const SpanText = styled.span`
  display: none;

  @media screen and (min-width: 375px) {
    display: flex;
    justify-content: flex-start;
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
                <Icon />
              </ButtonBtn>
              </BtnLink>
          </div>
        </CardContentWrapper>
      </Card>
    </CardWrapper>
  );
};


const Resources = ({ resources }) => (
  <Wrapper>
    {resources.map(createResource)}
  </Wrapper>
);


export default Resources;
