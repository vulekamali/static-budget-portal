import React, { createPortal } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { ArrowForward } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import trimValue from '../../../helpers/trimValues';

const Wrapper = styled.div`
width: 100%;
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
`

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px;
  border-bottom: 2px solid white;
`

const Icon = styled(ArrowForward)`
  && {
    height: 15px;
    width: 15px;
  }
`;

const Info = styled.div` 
  width: 100%;
  padding: 17px;
  min-width: 0;
`;

const ButtonWrapper = styled.a`
  text-decoration: none;
  padding-right: 17px;
  display: block;
`;

const ButtonStyle = styled(Button)`
  && {
    background-color: ${({ color }) => color};
    text-transform: none;
    box-shadow: none;
    min-width: 0;
    font-weight: 700;
    line-height: 120%;
    text-align: center;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 12px;
    padding: 9px;

    &:hover {
      background-color: ${({ color }) => darken(0.1, color)};
    }
  }
`;

const TextExploreButton = styled.div`
  padding-right: 12px;
  white-space: nowrap;

  @media screen and (min-width: 450px) {
    padding-right: 24px;
  }
`;

const InnerButton = ({ url, color, verb }) => (
  <ButtonStyle disabled={!url} {...{color}}>
    <TextExploreButton>{verb}</TextExploreButton>
    <Icon />
  </ButtonStyle>
);

const Title = styled.div`
  font-size: 12px;
  font-family: Roboto, sans-serif;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Amount = styled.div`
  font-size: 24px;
  font-weight: bold;
  font-family: Roboto, sans-serif;
`;


const MobileSectionHeading = ({ selected: { url, color, name, value, id }, verb, minimapRender }) => (
  <Wrapper>
    <Content>
      <Info>
        <Title>{name}</Title>
        <Amount>R{trimValue(value)}</Amount>
      </Info>
      <ButtonWrapper href={url}>
        <InnerButton {...{ url, color, verb }} />
      </ButtonWrapper>
    </Content>
    <div>{!!minimapRender && minimapRender(id)}</div>
  </Wrapper>
);

export default MobileSectionHeading;