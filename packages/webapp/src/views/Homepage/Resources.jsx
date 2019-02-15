import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Icon from '@material-ui/icons/ArrowDownward';


const Wrapper = styled.div`
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;

  @media screen and (min-width: 650px) {
    width: 550px;
  }

  @media screen and (min-width: 850px) {
    width: 850px;
  }

  @media screen and (min-width: 1200px) {
    width: 970px;
  }
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
  background-color: red;

  @media screen and (min-width: 850px) {
    width: 50%;
  }

  @media screen and (min-width: 1200px) {
    width: ${100 / 4}%;
  }
`;

const CardContainer = styled(Card)`
  height: 100px;
  && {
    display: flex;
    flex-direction: row;
    background-color: yellow;}

    @media screen and (min-width 350px) {
      display: flex;
      flex-direction: column;
     && {background-color: black;}
     }
`;

const DownloadBtn = styled(Button)`
  &&& {
    align-self: flex-end;
    min-width: 0;
    padding: 0;
    height: 57px;
    bottom: 60px;
    background-color: black;
  }

  @media screen and (min-width: 650px) {
    display: flex;
    width: 60%;
    && {
       margin: 0 55px;
    }

    @media screen and (min-width: 850px) {
      && {
        width: 90%;
        margin: 0 auto;
      }
    }
  }
 `;

const ButtonLink = styled.a`
  text-decoration: none;
`;

const SpanBtn = styled.span`
  display: none;

  @media screen and (min-width 350px) {
   display: visible;
  }
`;

const IconArrow = styled(Icon)`
 background-color: blue;
 margin: 0;
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
      <CardContainer>
        <CardContent>
          <div>
          <Title>{heading}</Title>
            <Size>{size} - {format}</Size>
            </div>
          <ButtonLink href={link}>
            <DownloadBtn variant="contained">
              <SpanBtn>Download</SpanBtn>
              <IconArrow style={{border: '1px solid red'}} />
            </DownloadBtn>
          </ButtonLink>
        </CardContent>
      </CardContainer>
    </CardWrapper>
  );
};


const Resources = ({ resources }) => (
  <Wrapper>
    <Typography>2019 budget resources</Typography>
    <ListWrapper>
      {resources.map(createResource)}
    </ListWrapper>
  </Wrapper>
);


export default Resources;
