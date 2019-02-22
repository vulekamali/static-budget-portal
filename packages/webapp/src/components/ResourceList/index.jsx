import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import Icon from '@material-ui/icons/ArrowDownward';
import Copy from '@material-ui/icons/FileCopy';
import { allSettled } from 'q';


const Title = styled(Typography)`
  && {
    height: 39px;
    font-family: Lato;
    line-height: 23px;
    font-size: 14px;
    color: #000000;
    // max-width: 193px;
  }
`;

const Size = styled(Typography)`
  && {
    color: grey;
    margin: 4.5% 0;
    font-size: 10px;
    letter-spacing: 0.5px;
    // max-width: 193px;
  }
`;

const CardWrapper = styled.div`
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;

  @media screen and (min-width: 600px) {
    max-width: 50%;
  }

  @media screen and (min-width: 1000px) {
    max-width: ${100 / 3}%
  }
`;

const StyledCard = styled(Card)`
   && {
    // width: 272px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);

    @media screen and (min-width: 375px) {
      // width: auto;
      // max-width: 50%;
    }

    @media screen and (min-width: 768px) {
      display: flex;
      // width: 225px;
      height: 145px;
    }
    transition: transform 500ms; 
     &:hover {
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05), 0px 10px 10px rgba(0, 0, 0, 0.2);
      transform: translate(-2px, -2px);
     }
   }
`;

const CardContentWrapper = styled(CardContent)`
  &&&&{
    padding: 16px;
    width: 100%;
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
    width: 40px;
    height: 57px;
    text-transform: none;
    box-shadow: none;
    
    @media screen and (min-width: 375px) {
      padding: 6px 16px;
      display: flex;
      justify-content: space-between;
      min-width: 193px;
      width: 100%;
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

const CardBlack = styled(StyledCard)`
  &&{ 
    background-color: #3F3F3F;
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
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
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

  const SizeAndFormat = !!size ? (
    <Size>{size} - {format}</Size>
  ) : (
    <Size>{format}</Size>
  )

  return (
    <CardWrapper key={heading}>
      <CssBaseline />
      <StyledCard>
        <CardContentWrapper>
          <HeadingText>
            <Title>{heading}</Title>
            {SizeAndFormat}
          </HeadingText>
          <div>
            <BtnLink href={link} target="_blank" rel="noopener noreferrer">
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

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Resources = ({ resources, cite }) => (
  <List>
    {resources.map(createResource)}
    {!!cite && <CopyCitation />}
  </List>
);


heading,
    size,
    format,
    link,
    cite

  Resources.propTypes = {
  /* Displays the title of the file to be downloaded */
  heading: t.string.isRequired,
  /* This can be a string or empty string or null. It displays the size of the file to download,
   * or nothing if button redirects to a website url instead.
   */
  size: t.string,
  /* Displays the format of the file to be downloaded */
  format: t.string.isRequired,
  /* url that links to the file to be downloaded or redirects to desired website */
  link: t.string.isRequired,
  /* True or false depending whether an extra card displaying a call to action card with custom styling placed
  as the last card in the list of cards */
  cite: t.bool
}

Resources.defaultProps = {
  size: '',
  cite: false,
}

export default Resources;
