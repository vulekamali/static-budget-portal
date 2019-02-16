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
    font-size: 15px;
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

  @media screen and (min-width: 850px) {
    width: 50%;
  }

  @media screen and (min-width: 1200px) {
    width: ${100 / 4}%;
  }
`;

const CardContentWrapper = styled(CardContent)`
  display: flex;
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
`;

const SpanText = styled.span`
  display: none;
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
          <div>
              <Title>{heading}</Title>
               <Size>{size} - {format}</Size>
            </div>
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
