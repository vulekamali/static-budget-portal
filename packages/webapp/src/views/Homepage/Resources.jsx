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
    width: ${100 / 3}%;
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
        <CardContent>
          <Title>{heading}</Title>
          <Size>{size} - {format}</Size>
          <a href={link}>
            <Button variant="contained">
              <span>Download</span>
              <Icon />
            </Button>
          </a>
        </CardContent>
      </Card>
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
