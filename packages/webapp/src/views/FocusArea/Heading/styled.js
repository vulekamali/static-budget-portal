import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const HeadingWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: #efefef;
  padding: 16px;
  margin-bottom: 36px;

  @media screen and (min-width: 600px) {
    padding: 64px 16px;
    margin-bottom: 64px;
  }
`;

const HeadingContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
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
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const RightOptions = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;

  @media screen and (min-width: 600px) {
    margin-top: 24px;
  }

  @media screen and (min-width: 1200px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

export { HeadingWrapper, HeadingContainer, HeadingText, Title, SelectsGroup, RightOptions };

export default {
  HeadingWrapper,
  HeadingContainer,
  HeadingText,
  Title,
  SelectsGroup,
  RightOptions,
};
