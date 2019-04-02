import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const BarChartTotal = styled.div`
  display: flex;
  width: 100%;
  height: 42px;
  margin-bottom: 10px;
  background-color: #f7f7f7;

  @media screen and (min-width: 600px) {
    height: 75px;
  }
`;

const ColorBar = styled.div`
  width: ${({ ratio }) => ratio}%;
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  white-space: nowrap;
`;

const Details = styled.div`
  text-align: ${({ labelOutside }) => (labelOutside ? 'left' : 'right')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: ${({ labelOutside }) => (labelOutside ? null : '16px')};
  padding-left: ${({ labelOutside }) => (labelOutside ? '16px' : null)};

  @media screen and (min-width: 600px) {
    padding-right: ${({ labelOutside }) => (labelOutside ? null : '24px')};
    padding-left: ${({ labelOutside }) => (labelOutside ? '24px' : null)};
  }
`;

const Title = styled(Typography)`
  && {
    font-weight: 700;
    font-size: 10px;
    line-height: 120%;
    color: #000;

    @media screen and (min-width: 600px) {
      font-size: 18px;
    }
  }
`;

const Amount = styled(Typography)`
  && {
    font-size: 10px;
    line-height: 120%;
    color: #000;

    @media screen and (min-width: 600px) {
      font-size: 18px;
    }
  }
`;

export {
  BarChartTotal,
  ColorBar,
  Title,
  Amount,
  Details
}

export default {
  BarChartTotal,
  ColorBar,
  Title,
  Amount,
  Details
}
